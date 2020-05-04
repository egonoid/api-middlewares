import { Middleware } from 'middy';
import { ObjectSchema } from 'yup';
declare const bodyValidator: Middleware<{
    schema: ObjectSchema;
    payloadSelector?: string;
}, any, any>;
export default bodyValidator;
