import { ZodObject, ZodIssue } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const r = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!r.success) {
      const msg = r.error.issues
        .map((i: ZodIssue) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      return next({ status: 400, message: msg });
    }

    next();
  };
