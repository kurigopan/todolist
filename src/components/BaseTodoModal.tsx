import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Category, Todo } from "../types/todo";
import { Status } from "../types/status";

type Props = {
  isFormVisible: boolean;
  onAdd?: (input: {
    title: string;
    category: Category;
    dueDate?: Date;
    status: Status;
  }) => void;
  onEdit?: (input: {
    id: string;
    title: string;
    category: Category;
    dueDate?: Date;
    status: Status;
  }) => void; // Optional for edit mode
  onClose: () => void;
  mode: "new" | "edit";
  todo?: Todo; // Optional for edit mode
};

export const BaseTodoModal: React.FC<Props> = ({
  isFormVisible,
  onAdd,
  onEdit,
  onClose,
  mode,
  todo,
}) => {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [category, setCategory] = useState<Category>(
    todo ? todo.category : "仕事"
  );
  const [dueDate, setDueDate] = useState(todo ? todo.dueDate : new Date());
  const [status, setStatus] = useState<Status>(todo ? todo.status : "TODO");

  const handleSubmit = () => {
    if (mode === "new" && onAdd) {
      onAdd({ title, category, dueDate, status });
    } else if (mode === "edit" && todo && onEdit) {
      onEdit({ id: todo.id, title, category, dueDate, status });
    }
    onClose(); // モーダルを閉じる
  };
  const modeText = mode === "new" ? "追加" : "更新";

  return (
    <Modal
      open={isFormVisible}
      onClose={onClose}
      className="flex items-center justify-center bg-gray-300/50"
    >
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded">
        <h2 className="text-lg font-semibold text-black">TODOの{modeText}</h2>
        <form className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="TODO"
            value={title}
            className="border p-2 rounded placeholder-gray-400"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            placeholder="期限"
            value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
            className="border p-2 rounded placeholder-gray-400"
            onChange={(e) => setDueDate(new Date(e.target.value))}
          />
          <select
            className="block border p-2 rounded placeholder-gray-400"
            onChange={(e) => setCategory(e.target.value as Category)}
            value={category}
          >
            <option>仕事</option>
            <option>家事</option>
            <option>プライベート</option>
          </select>
          <select
            className="block border p-2 rounded placeholder-gray-400"
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="TODO">未完了</option>
            <option value="IN PROGRESS">進行中</option>
            <option value="DONE">完了</option>
          </select>

          <div className="flex gap-2">
            {/* フォーム閉じるボタン */}
            <button
              type="button"
              onClick={onClose}
              className="bg-red-300 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              キャンセル
            </button>
            {/* TODO追加ボタン */}
            <button
              type="submit"
              className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={handleSubmit}
            >
              {modeText}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
