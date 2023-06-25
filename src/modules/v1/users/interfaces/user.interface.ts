import RoleEntity from "@v1/roles/schema/role.entity";

export interface ICreateUser {
  email: string;

  password: string;

  roles: RoleEntity[];
}
