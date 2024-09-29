import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../types';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
