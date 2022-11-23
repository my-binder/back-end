import { ErrorResponse } from '@/types';

export function notFound(message?: string | object) {
  return {
    code: 404,
    message
  } as ErrorResponse
}