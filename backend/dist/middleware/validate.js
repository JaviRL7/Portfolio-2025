"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, _res, next) => {
    const r = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
    });
    if (!r.success) {
        const msg = r.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; ");
        return next({ status: 400, message: msg });
    }
    next();
};
exports.validate = validate;
