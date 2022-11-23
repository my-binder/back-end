import { ErrorResponse } from '@/types';

export function conflict(message?: string | object) {
  return {
    code: 409,
    message
  } as ErrorResponse
}