import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm/index';
import { ICreateUser } from '@v1/users/interfaces/user.interface';

import UpdateUserDto from './dto/update-user.dto';
import UserEntity from './schemas/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersModel: Repository<UserEntity>,
  ) {}

  public create(user: ICreateUser): Promise<UserEntity> {
    return this.usersModel.save({
      ...user,
      verified: false,
    });
  }

  public async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersModel.findOne({
      where: [
        {
          email,
        },
      ],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  public async getUnverifiedUserByEmail(
    email: string,
  ): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      where: [
        {
          email,
          verified: false,
        },
      ],
    });
  }

  public async getVerifiedUserByEmail(
    email: string,
  ): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      where: [
        {
          email,
          verified: true,
        },
      ],
      relations: ['roles'],
    });
  }

  public async getById(id: string): Promise<UserEntity | void> {
    return this.usersModel.findOneBy({
      id,
    });
  }

  public async getVerifiedUserById(id: string): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      where: [{ id, verified: true }],
      relations: ['roles'],
    });
  }

  public async getUnverifiedUserById(id: string): Promise<UserEntity | void> {
    return this.usersModel.findOne({
      where: [{ id, verified: false }],
    });
  }

  public updateById(id: string, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersModel.update(id, data);
  }

  public getAll(): Promise<UserEntity[] | []> {
    return this.usersModel.find();
  }

  public getVerifiedUsers(): Promise<UserEntity[] | []> {
    return this.usersModel.find({
      where: {
        verified: true,
      },
      relations: {
        roles: true,
      },
      select: ['id', 'email', 'roles'],
    });
  }
}
