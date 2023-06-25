import { RolesEnum } from '@decorators/roles.decorator';

export interface JwtStrategyValidate {
  id: string;
  email: string;
  roles: RolesEnum[];
}
