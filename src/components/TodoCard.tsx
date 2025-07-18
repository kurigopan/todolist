import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "../types/todo";
import { EditTodoModal } from "./EditTodoModal";

type Props = {
  todo: Todo;
  onEdit: (input: Todo) => void;
  handleDelete: (id: string) => void;
};

const categoryClass = {
  仕事: "bg-blue-100 text-blue-700",
  家事: "bg-green-100 text-green-700",
  プライベート: "bg-pink-100 text-pink-700",
};

export const TodoCard: React.FC<Props> = ({ todo, onEdit, handleDelete }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleToggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const { id, title, dueDate, category } = todo;

  return (
    <div>
      <ul className="space-y-2">
        <li className="bg-white p-4 rounded shadow flex items-center gap-4 cursor-move">
          <div className="flex-1">
            <div className="flex items-center justify-between space-x-2">
              <div className="font-bold p-3">{title}</div>
              <div className="flex items-center">
                <button
                  onClick={handleToggleForm}
                  className="text-sm hover:text-gray-800"
                >
                  <EditIcon />
                </button>
                {isFormVisible && (
                  <EditTodoModal
                    isFormVisible={isFormVisible}
                    onEdit={onEdit}
                    onClose={handleToggleForm}
                    todo={todo}
                  />
                )}
                <button
                  onClick={() => handleDelete(id)}
                  className="text-sm hover:text-gray-800"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`ml-2 text-xs px-2 py-1 rounded-full ${categoryClass[category]}`}
              >
                {category}
              </span>
              <p className="text-sm text-gray-600">
                {dueDate?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
