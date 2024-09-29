import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ActiveUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);