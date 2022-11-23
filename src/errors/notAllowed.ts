import { ErrorResponse } from '@/types';

export function notAllowed(message?: string | object) {
  return {
    code: 403,
    message
  } as ErrorResponse
}