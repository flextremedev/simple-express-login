import { genSalt as genSaltFromBcrypt } from "bcryptjs";
export type GenerateSalt = (rounds?: number | undefined) => Promise<string>;
export const generateSalt: GenerateSalt = async (
  rounds?: number | undefined
): Promise<string> => {
  return genSaltFromBcrypt(rounds);
};
