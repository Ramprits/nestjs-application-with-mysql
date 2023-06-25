import {
  Repository,
  DeepPartial,
  FindManyOptions,
  Like,
  FindOneOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }

  async update(id: number, entity: QueryDeepPartialEntity<T>) {
    await this.repository.update(id, entity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(options: FindOneOptions<T>): Promise<T | undefined> {
    return this.repository.findOne(options);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<{
    data: T[];
    total: number;
  }> {
    const options: FindManyOptions<T> = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (search) {
      const searchConditions: any[] = [];
      // Customize this logic based on your entity's properties and search requirements.
      // The example below assumes searching by the 'name' column.
      searchConditions.push({ name: Like(`%${search}%`) });
      options.where = searchConditions;
    }

    const [entities, total] = await this.repository.findAndCount(options);
    return {
      data: entities,
      total,
    };
  }
}
