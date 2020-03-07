import type { HttpRequest } from "src/types/HttpRequest"
import { HttpResponse } from "src/types/HttpResponse";
import { login } from "../use-cases/loginUseCase";
import {v4 as uuidv4} from "uuid";
type LoginParams = {
    username: string;
    password: string;
}
export const makeLoginController = function makeLogin(loginUseCase: ({username, password}: LoginParams) => Promise<boolean>){
    return async function loginController(httpRequest: HttpRequest): Promise<HttpResponse>{
        try{
        const {body} = httpRequest;
        if(body){
            const {username, password} = body;
            if(username && password){
                const isValidUser = await loginUseCase({username, password});
                let sid: string | undefined = undefined;
                let response: HttpResponse = {};
                let headers = {};
                if(isValidUser){
                    sid = uuidv4()
                    headers = Object.assign(headers, {"Set-Cookie": `sid=${sid}`})
                    response = Object.assign(response, {statusCode: 200});
                }
                else{
                    response = Object.assign(response, {statusCode: 401});
                }
                response = Object.assign(response, {headers});
                return response;
            }
        }
        throw Error('Username or password not set')
    }
    catch(e){
        throw new Error(e);
    }
    }
}

export const loginController = makeLoginController(login);