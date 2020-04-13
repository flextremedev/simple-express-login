import { HttpRequest } from "src/common/types/HttpRequest";
import { HttpResponse } from "src/common/types/HttpResponse";

export const makeIsAuthenticatedController = function makeIsAuthenticatedController(
    getExpirationByDuration: (duration: number) => number
) {
    return async function isAuthenticatedController(req: HttpRequest): Promise<HttpResponse> {
        const response: HttpResponse = {};
        try {
            const { session } = req;
            if (session) {
                const { userId, cookie } = session;
                if (userId && cookie.originalMaxAge) {
                    const expires = getExpirationByDuration(cookie.originalMaxAge);
                    response.statusCode = 200;
                    response.body = { expires, id: userId };
                    return response;
                }
            }
            response.statusCode = 401;
            return response;
        } catch (e) {
            response.statusCode = 401;
            return response;
        }
    };
};
