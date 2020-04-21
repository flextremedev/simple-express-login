import { genSalt as genSaltFromBcrypt } from "bcryptjs";
export type GenerateSalt = (rounds?: number | undefined) => Promise<string>;
export const generateSalt: GenerateSalt = async (rounds) => {
  return genSaltFromBcrypt(rounds);
};
