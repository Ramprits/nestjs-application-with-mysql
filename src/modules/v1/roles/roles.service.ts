import { Injectable } from '@nestjs/common';

import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import RoleEntity from './schema/role.entity';
import { RoleQueryDto } from './dto/role-query.dto';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleRepository.create(createRoleDto);
  }

  async getAll(query: RoleQueryDto) {
    return this.roleRepository.findAll(query.page, query.limit, query.search);
  }
}
