import { Entity, Column, Index, ManyToMany, JoinTable } from 'typeorm';
import { AbstractEntity } from '@utils/abstract.base.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import RoleEntity from '@v1/roles/schema/role.entity';

@Entity('users')
export default class UserEntity extends AbstractEntity<UserEntity> {
  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Exclude()
  readonly password: string;

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Index({ unique: true })
  readonly email: string;

  @ApiProperty({ type: Boolean })
  @Column({ type: 'tinyint' })
  readonly verified: boolean = false;

  @ManyToMany(() => RoleEntity, {
    cascade: true,
  })
  @JoinTable({
    name: 'users_roles',
  })
  readonly roles!: RoleEntity[];
}
