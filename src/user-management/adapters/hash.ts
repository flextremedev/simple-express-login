import { hash as hashFromBcrypt } from "bcryptjs";
export type Hash = (
  valueToHash: string,
  salt: string | number
) => Promise<string>;
export const hash: Hash = async (valueToHash, salt) => {
  return hashFromBcrypt(valueToHash, salt);
};
