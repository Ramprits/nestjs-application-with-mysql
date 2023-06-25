import { Repository } from 'typeorm';
import RoleEntity from './schema/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@utils/base.repository';
import { Logger } from '@nestjs/common';

export class RoleRepository extends BaseRepository<RoleEntity> {
  private readonly logger = new Logger(RoleRepository.name);
  constructor(
    @InjectRepository(RoleEntity)
    protected readonly repository: Repository<RoleEntity>,
  ) {
    super(repository);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<{
    data: RoleEntity[];
    total: number;
  }> {
    const skip = (page - 1) * limit;
    let query = this.repository.createQueryBuilder('role');
    if (search?.trim()) {
      query = query.andWhere('role.name LIKE :name', {
        name: `%${search}%`,
      });
    }

    const [entities, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return { data: entities, total };
  }
}
