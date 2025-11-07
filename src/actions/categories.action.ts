import type { ActionFunctionArgs } from "react-router-dom";
import { instance } from "../api/axios.api";

export const categoriesAction = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const title = {
        title: formData.get("title"),
      };
      await instance.post("/categories", title);
      return null;
    }
    case "PATCH": {
      const formData = await request.formData();
      const category = {
        title: formData.get("title"),
      };
      const categoryId = formData.get("id");
      await instance.patch(`/categories/category/${categoryId}`, category);
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const categoryId = formData.get("id");
      await instance.delete(`/categories/category/${categoryId}`);
      return null;
    }
  }
};