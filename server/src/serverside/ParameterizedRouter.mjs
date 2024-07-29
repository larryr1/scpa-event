import { Router } from "express"

export const ParameterizedRouter = (options) => {
  return Router({ mergeParams: true, ...options});
}