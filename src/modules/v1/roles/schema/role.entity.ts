import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '@utils/abstract.base.entity';

@Entity('roles')
export default class RoleEntity extends AbstractEntity<RoleEntity> {
  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  name: string;
}
