import { Injectable } from '@nestjs/common';
import {
  Model,
  PartialModelObject,
  QueryBuilder,
  Transaction,
} from 'objection';
import {
  IDefaultOptions,
  IGetMetaProps,
  IMeta,
  IPaginateResult,
} from '../paginate-result.interface';

@Injectable()
export class AbstractService<T extends Model> {
  private transaction?: Transaction;

  protected constructor(
    private readonly modelClass: typeof Model & { new (): T },
    protected readonly entityName?: string,
  ) {}

  protected DEFAULTOPTIONS: IDefaultOptions = { limit: 10, page: 1 };

  protected getMeta({ total, data, limit, page }: IGetMetaProps): IMeta {
    let meta: Partial<IMeta> = { totalItems: total, count: data?.length };
    meta = { ...meta, itemsPerPage: limit, currentPage: page };
    meta = { ...meta, totalPages: Math.ceil(total / limit) };
    return meta as IMeta;
  }

  async findAll(
    queryBuilder?: (query: QueryBuilder<T, T[]>) => QueryBuilder<T, T[]>,
    trx?: Transaction,
  ): Promise<T[]> {
    let query = this.modelClass.query(trx) as QueryBuilder<T, T[]>;
    if (queryBuilder) {
      query = queryBuilder(query);
    }
    return await query;
  }

  async create(data: PartialModelObject<T>, trx?: Transaction): Promise<T> {
    return (await this.modelClass.query(trx).insert(data)) as T;
  }

  async save(data: PartialModelObject<T>, trx?: Transaction): Promise<T> {
    if ((data as any).id) {
      return await this.update((data as any).id, data, trx);
    } else {
      return await this.create(data, trx);
    }
  }

  async createMany(
    data: PartialModelObject<T>[],
    trx?: Transaction,
  ): Promise<T[]> {
    return (await this.modelClass.query(trx).insert(data)) as T[];
  }

  async findOne(
    queryBuilder?: (query: any) => any,
    trx?: Transaction,
  ): Promise<T | undefined> {
    let query = this.modelClass.query(trx).first();
    if (queryBuilder) {
      query = queryBuilder(query);
    }
    return (await query) as T | undefined;
  }

  async findOneOrFail(
    queryBuilder?: (query: any) => any,
    trx?: Transaction,
  ): Promise<T> {
    const result = await this.findOne(queryBuilder, trx);
    if (!result) {
      throw new Error(`${this.entityName || 'Record'} not found`);
    }
    return result;
  }

  async findByIds(ids: string[] | number[], trx?: Transaction): Promise<T[]> {
    return (await this.modelClass.query(trx).findByIds(ids)) as T[];
  }

  async count(
    queryBuilder?: (query: QueryBuilder<T, T[]>) => QueryBuilder<T, T[]>,
    trx?: Transaction,
  ): Promise<number> {
    let query = this.modelClass.query(trx) as QueryBuilder<T, T[]>;
    if (queryBuilder) {
      query = queryBuilder(query);
    }
    const result = await query.count('* as count').first();
    return parseInt((result as any)?.count as string) || 0;
  }

  async find(
    queryBuilder?: (query: QueryBuilder<T, T[]>) => QueryBuilder<T, T[]>,
    options?: IDefaultOptions,
  ): Promise<IPaginateResult<T[]>> {
    let limit = this.DEFAULTOPTIONS.limit;
    let page = this.DEFAULTOPTIONS.page;

    if (options) {
      limit = options.limit;
      page = options.page;
    }

    const offset = (page - 1) * limit;

    let countQuery = this.modelClass.query() as QueryBuilder<T, T[]>;
    let dataQuery = this.modelClass.query() as QueryBuilder<T, T[]>;

    if (queryBuilder) {
      countQuery = queryBuilder(countQuery);
      dataQuery = queryBuilder(dataQuery);
    }

    const [countResult, data] = await Promise.all([
      countQuery.count('* as count').first(),
      dataQuery.offset(offset).limit(limit),
    ]);

    const total = parseInt((countResult as any)?.count as string) || 0;
    const meta = this.getMeta({ total, data: data as any[], limit, page });

    return { data: data as T[], meta };
  }

  async update(
    id: any,
    data: PartialModelObject<T>,
    trx?: Transaction,
  ): Promise<T> {
    const exists = await this.modelClass.query(trx).findById(id);
    if (!exists) {
      throw new Error(`${this.entityName || 'Record'} Does Not Exist`);
    }

    return (await this.modelClass.query(trx).patchAndFetchById(id, data)) as T;
  }

  async updateWhere(
    queryBuilder: (query: QueryBuilder<T, T[]>) => QueryBuilder<T, T[]>,
    data: PartialModelObject<T>,
    trx?: Transaction,
  ): Promise<T> {
    let query = this.modelClass.query(trx) as QueryBuilder<T, T[]>;
    query = queryBuilder(query);

    const exists = await query.first();
    if (!exists) {
      throw new Error(`${this.entityName || 'Record'} Does Not Exist`);
    }

    await query.patch(data);
    return (await this.modelClass.query(trx).findById((exists as any).id)) as T;
  }

  async updateManyWhere(
    queryBuilder: (query: QueryBuilder<T, T[]>) => QueryBuilder<T, T[]>,
    data: PartialModelObject<T>,
    trx?: Transaction,
  ): Promise<T[]> {
    let query = this.modelClass.query(trx) as QueryBuilder<T, T[]>;
    query = queryBuilder(query);

    const exists = await query;
    if (!exists || exists.length === 0) return [];

    const ids = exists.map((item) => (item as any).id);
    await this.modelClass.query(trx).findByIds(ids).patch(data);

    return (await this.modelClass.query(trx).findByIds(ids)) as T[];
  }

  async softRemove(
    queryBuilder: (query: any) => any,
    trx?: Transaction,
  ): Promise<{ message: string }> {
    let query = this.modelClass.query(trx).first();
    query = queryBuilder(query);

    const exists = await query;
    if (!exists) {
      throw new Error(`${this.entityName || 'Record'} Does Not Exist`);
    }

    // Assuming soft delete uses deletedAt field
    await this.modelClass
      .query(trx)
      .findById((exists as any).id)
      .patch({ deletedAt: new Date() } as any);

    return { message: `${this.entityName || 'Record'} Deleted Successfully` };
  }

  async restore(
    queryBuilder: (query: any) => any,
    trx?: Transaction,
  ): Promise<{ message: string }> {
    let query = this.modelClass.query(trx).first();
    query = queryBuilder(query);

    const exists = await query;
    if (!exists) {
      throw new Error(`${this.entityName || 'Record'} Does Not Exist`);
    }

    // Restore by setting deletedAt to null
    await this.modelClass
      .query(trx)
      .findById((exists as any).id)
      .patch({ deletedAt: null } as any);

    return {
      message: `${this.entityName || 'Record'} Restored Successfully`,
    };
  }

  async delete(
    id: string | number | string[] | number[],
    trx?: Transaction,
  ): Promise<number> {
    return await this.modelClass.query(trx).deleteById(id);
  }

  async deleteWhere(
    queryBuilder: (query: QueryBuilder<T, T[]>) => QueryBuilder<T, T[]>,
    trx?: Transaction,
  ): Promise<number> {
    let query = this.modelClass.query(trx) as QueryBuilder<T, T[]>;
    query = queryBuilder(query);
    return await query.delete();
  }

  protected async executeInTransaction<TResult>(
    action: (trx: Transaction) => Promise<TResult>,
  ): Promise<TResult> {
    return await Model.transaction(async (trx) => {
      return await action(trx);
    });
  }

  async createTransaction(): Promise<Transaction> {
    if (this.transaction) {
      throw new Error('Active transaction already exists');
    }
    this.transaction = await Model.startTransaction();
    return this.transaction;
  }

  async commitTransaction(trx: Transaction): Promise<void> {
    if (!trx) {
      throw new Error('Transaction has not been started.');
    }
    try {
      await trx.commit();
    } finally {
      await this.releaseTransaction(trx);
    }
  }

  async rollbackTransaction(trx: Transaction): Promise<void> {
    if (!trx) {
      throw new Error('Transaction has not been started.');
    }
    try {
      await trx.rollback();
    } finally {
      await this.releaseTransaction(trx);
    }
  }

  private async releaseTransaction(trx?: Transaction): Promise<void> {
    if (trx && this.transaction === trx) {
      this.transaction = undefined;
    }
  }
}
