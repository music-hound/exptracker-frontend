import { useState, type FC } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import type { ICategory } from "../types/types";

export const categoriesAction = async ({ request }: any) => {
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

export const categoryLoader = async () => {
  const res = await instance.get<ICategory[]>("/categories");
  return res.data;
};

const Categories: FC = () => {
  const categorires = useLoaderData() as ICategory[];
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>Your category list</h1>
        {/* Category List */}
        <div className="flex mt-2 flex-wrap items-center gap-2">
          {/* Category Item */}
          {categorires &&
            categorires.map((category) => (
              <div
                key={category.id}
                className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2"
              >
                {category.title}
                <div className="absolute px-3 left-0 right-0 top-0 bottom-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex hidden">
                  <button
                    onClick={() => {
                      setCategoryId(category.id);
                      setVisibleModal(true);
                      setIsEdit(true);
                    }}
                  >
                    <AiFillEdit />
                  </button>

                  <Form className="flex" method="delete" action="/categories">
                    <input type="hidden" name="id" value={category.id} />
                    <button type="submit">
                      <AiFillCloseCircle />
                    </button>
                  </Form>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={() => {
            setVisibleModal(true);
          }}
          className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white cursor-pointer"
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>

      {/* Add Category Modal */}
      {visibleModal && (
        <CategoryModal type="POST" setVisibleModal={setVisibleModal} />
      )}

      {/* Edit Category Modal */}
      {visibleModal && isEdit && (
        <CategoryModal
          type="PATCH"
          id={categoryId}
          setVisibleModal={setVisibleModal}
        />
      )}
    </>
  );
};

export default Categories;
