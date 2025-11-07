import { type FC } from "react";
import { Form } from "react-router-dom";

interface ICategoryModal {
  type: "POST" | "PATCH";
  id?: number | string;
  setVisibleModal: (visible: boolean) => void;
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form
        className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5"
        method={type}
        action="/categories"
        onSubmit={() => setVisibleModal(false)}
      >
        <label htmlFor="title">
          <small>Category Title</small>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Title..."
          />
          <input type="hidden" name="id" value={id} />
        </label>

        <div className="flex items-center gap-2">
          <button className="btn btn-green" type="submit">
            {type === "PATCH" ? "Save" : "Create"}
          </button>
          <button
            className="btn btn-red"
            onClick={() => setVisibleModal(false)}
          >
            Close
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryModal;
