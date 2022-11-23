import { ErrorResponse } from '@/types';

export function unauthorized(message?: string | object) {
  return {
    code: 401,
    message
  } as ErrorResponse
}