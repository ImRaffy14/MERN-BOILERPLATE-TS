import { JWEPayload } from '../auth';

declare global {
    namespace Express {
        interface Request {
        user?: JWEPayload;
        }
    }
}