import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';
import { RolesModule } from './roles/roles.module';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/roles', module: RolesModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    UsersModule,
    RolesModule,
  ],
})
export default class V1Module {}
