import { makeIsAuthenticatedController } from "./makeIsAuthenticatedController";
import { getExpirationByDuration } from "../../../common/utils/getExpirationByDuration";

export const isAuthenticatedController = makeIsAuthenticatedController(getExpirationByDuration);
