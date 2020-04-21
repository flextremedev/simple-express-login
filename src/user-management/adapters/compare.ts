import { compare as compareFromBcrypt } from "bcryptjs";
export type Compare = (
  valueToCompare: string,
  hash: string
) => Promise<boolean>;
export const compare: Compare = (valueToCompare, hash) => {
  return compareFromBcrypt(valueToCompare, hash);
};
