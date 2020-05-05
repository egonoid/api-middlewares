import { Middleware } from 'middy';
import { APIGatewayProxyEvent } from 'aws-lambda';

const removeEmptyQueryParams: Middleware<
  any,
  APIGatewayProxyEvent,
  any
> = () => {
  return {
    before: (handler, next) => {
      const params = handler.event.queryStringParameters;

      if (params) {
        Object.keys(params).forEach((k) => {
          if (params[k] === null || params[k] === '') {
            delete params[k];
          }
        });
      }

      next();
    },
  };
};

export default removeEmptyQueryParams;
