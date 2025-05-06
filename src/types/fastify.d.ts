// src/types/fastify.d.ts
import { RouteGenericInterface } from 'fastify';

export interface AuthRoute extends RouteGenericInterface {
  Body: {
    email: string;
    password: string;
  };
}
