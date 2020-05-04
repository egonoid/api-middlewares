import { validate } from '@api/validators/validator';
const bodyValidator = config => {
    return {
        before: (handler, next) => {
            if (!(config === null || config === void 0 ? void 0 : config.schema)) {
                throw new Error('Schema is missing.');
            }
            let body;
            try {
                body = JSON.parse(handler.event.body);
            }
            catch (_a) {
                return handler.callback(null, {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'INVALID_REQUEST' }),
                });
            }
            const { schema, payloadSelector } = config;
            const payload = payloadSelector ? body[payloadSelector] : body;
            validate(payload, schema)
                .then(model => {
                handler.event.model = model;
                next();
            })
                .catch(err => handler.callback(null, {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'INVALID_REQUEST',
                    errors: err.errors,
                }),
            }));
        },
    };
};
export default bodyValidator;
//# sourceMappingURL=bodyValidator.middleware.js.map