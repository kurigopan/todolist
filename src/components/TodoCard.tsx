"use client";

import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { EditTodoModal } from "./EditTodoModal";
import { Todo, Category } from "../types/todo";

type Props = {
  todo: Todo;
  onEdit: (input: Todo) => void;
  handleDelete: (id: string) => void;
};

const categoryClass = {
  WORK: "bg-blue-100 text-blue-700",
  HOUSEWORK: "bg-green-100 text-green-700",
  PRIVATE: "bg-pink-100 text-pink-700",
};

export const TodoCard: React.FC<Props> = ({ todo, onEdit, handleDelete }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { id, title, dueDate, category } = todo;

  const handleToggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const categoryMap: Record<Category, string> = {
    WORK: "仕事",
    HOUSEWORK: "家事",
    PRIVATE: "プライベート",
  };

  const categoryText = (category: Category): string => categoryMap[category];

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div>
      <ul className="space-y-2">
        <li
          ref={setNodeRef}
          style={style}
          className="bg-white p-4 rounded shadow flex items-center gap-4 cursor-move"
        >
          <div className="flex-1">
            <div className="flex items-center justify-between space-x-2">
              <div {...listeners} {...attributes} className="font-bold p-3">
                {title}
              </div>
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
                  onClick={() => {
                    handleDelete(id);
                  }}
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
                {categoryText(category)}
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
