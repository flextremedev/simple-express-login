import { v4 } from "uuid";
export type GenerateId = () => string;
export const generateId: GenerateId = () => {
  return v4();
};
