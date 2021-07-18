import { Response } from 'express';

export const handleError = (
  res: Response,
  errorMessage: string,
  statusResponse?: number,
  errorResponse?: string | Object
) => {
  console.log(errorResponse);
  const status = statusResponse || 500;
  const response = errorResponse || {
    message: 'Server Error',
    error: errorMessage
  };

  res.status(status).json(response);
};
