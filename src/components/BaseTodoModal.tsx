import React, { useState } from "react";
import { Modal, TextField, MenuItem } from "@mui/material";
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
  mode: "NEW" | "EDIT";
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
    todo ? todo.category : "WORK"
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(todo?.dueDate);
  const [status, setStatus] = useState<Status>(todo ? todo.status : "TODO");

  const handleSubmit = () => {
    if (mode === "NEW" && onAdd) {
      onAdd({ title, category, dueDate, status });
    } else if (mode === "EDIT" && todo && onEdit) {
      onEdit({ id: todo.id, title, category, dueDate, status });
    }
    onClose(); // モーダルを閉じる
  };
  const modeText = mode === "NEW" ? "追加" : "更新";

  return (
    <Modal
      open={isFormVisible}
      onClose={onClose}
      className="flex items-center justify-center bg-gray-300/50"
    >
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded">
        <h2 className="text-lg font-semibold text-black">TODOの{modeText}</h2>
        <form className="flex flex-col gap-4">
          <TextField
            label="TODO"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              style: { color: "#000" },
            }}
            InputLabelProps={{
              style: { color: "#555" },
            }}
          />
          <TextField
            label="期限"
            type="date"
            variant="outlined"
            fullWidth
            value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const value = e.target.value;
              setDueDate(value ? new Date(value) : undefined);
            }}
            InputProps={{
              style: { color: "#000" },
            }}
            InputLabelProps={{
              style: { color: "#555" },
              shrink: true, // ← これがないと日付型ラベルが被る
            }}
          />
          <TextField
            select
            label="カテゴリ"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            fullWidth
          >
            <MenuItem value="WORK">仕事</MenuItem>
            <MenuItem value="HOUSEWORK">家事</MenuItem>
            <MenuItem value="PRIVATE">プライベート</MenuItem>
          </TextField>
          <TextField
            select
            label="ステータス"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            fullWidth
          >
            <MenuItem value="TODO">未完了</MenuItem>
            <MenuItem value="IN PROGRESS">進行中</MenuItem>
            <MenuItem value="DONE">完了</MenuItem>
          </TextField>
        </form>
        <div className="flex justify-between w-full">
          {/* キャンセルボタン（フォーム閉じる） */}
          <button
            type="button"
            onClick={onClose}
            className="bg-red-300 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            キャンセル
          </button>
          {/* 追加ボタン */}
          <button
            type="submit"
            className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={handleSubmit}
          >
            {modeText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
