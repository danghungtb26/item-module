import { HttpResponse } from '@responses/HttpResponse'
import { Request, NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'

export const handleValidationError = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res
      .status(422)
      .json(new HttpResponse({ message: error.array()[0].msg || '', status: 422 }))
  }
  return next()
}
