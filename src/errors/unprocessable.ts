import { ErrorResponse } from '@/types';

export function unprocessable(message?: string | object) {
  return {
    code: 422,
    message
  } as ErrorResponse
}