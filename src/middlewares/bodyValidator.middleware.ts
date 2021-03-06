import { Middleware } from 'middy';
import { validate } from '../extensions/validator.extension';
import { ObjectSchema } from 'yup';

const bodyValidator: Middleware<
  { schema: ObjectSchema; payloadSelector?: string },
  any,
  any
> = (config) => {
  return {
    before: async (handler) => {
      if (!config?.schema) {
        throw new Error('Schema is missing.');
      }

      let body;

      try {
        body = JSON.parse(handler.event.body);
      } catch {
        return handler.callback(null, {
          statusCode: 400,
          body: JSON.stringify({ message: 'INVALID_REQUEST' }),
        });
      }

      if (!body) {
        return handler.callback(null, {
          statusCode: 400,
          body: JSON.stringify({ message: 'INVALID_REQUEST' }),
        });
      }

      const { schema, payloadSelector } = config;
      const payload = payloadSelector ? body[payloadSelector] : body;

      try {
        const model = await validate(payload, schema);
        handler.event.model = model;
      } catch (err) {
        handler.callback(null, {
          statusCode: 400,
          body: JSON.stringify({
            message: 'INVALID_REQUEST',
            errors: err.errors,
          }),
        });
      }

      return;
    },
  };
};

export default bodyValidator;
