import type { HttpRequest } from "src/types/HttpRequest"
import { HttpResponse } from "src/types/HttpResponse";
type LoginParams = {
    username: string;
    password: string;
}
export const makeLoginController = function makeLogin(loginUseCase: () => Promise<string>){
    return async function loginController(httpRequest: HttpRequest): Promise<HttpResponse>{
                
                const sid = await loginUseCase();
        return {statusCode: 200, headers:{"X-sid": sid}};
    }
}

const loginUseCase = (): Promise<string> => new Promise(res => {res('mockSessionId')});

export const loginController = makeLoginController(loginUseCase);