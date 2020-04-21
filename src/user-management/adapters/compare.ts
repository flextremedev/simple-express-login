import { compare as compareFromBcrypt } from "bcryptjs";
export type Compare = (
  valueToCompare: string,
  hash: string
) => Promise<boolean>;
export const compare = (
  valueToCompare: string,
  hash: string
): Promise<boolean> => {
  return compareFromBcrypt(valueToCompare, hash);
};
