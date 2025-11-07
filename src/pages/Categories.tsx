import { useState, type FC } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import type { ICategory } from "../types/types";

const Categories: FC = () => {
  const categorires = useLoaderData() as ICategory[];
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | string | undefined>(
    undefined,
  );
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
