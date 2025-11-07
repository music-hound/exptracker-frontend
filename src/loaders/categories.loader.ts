import { instance } from "../api/axios.api";
import type { ICategory } from "../types/types";

export const categoryLoader = async () => {
  const res = await instance.get<ICategory[]>("/categories");
  return res.data;
};