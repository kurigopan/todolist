import { Todo } from "../types/todo";
import { Status } from "../types/status";
import { TodoCard } from "./TodoCard";
import React, { useEffect } from "react";

/* ドラッグ&ドロップ */
import { useDroppable } from "@dnd-kit/core";

type Props = {
  backgroundColor: string;
  status: Status;
  todos: Todo[];
  onEdit: (input: Todo) => void;
  handleDelete: (id: string) => void;
  isDragging: boolean;
  draggedTodoId?: string;
};

export const StatusSection: React.FC<Props> = ({
  backgroundColor,
  status,
  todos,
  onEdit,
  handleDelete,
  isDragging,
  draggedTodoId,
}) => {
  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  useEffect(() => {
    console.log("isDragging", isDragging);
    console.log("draggedTodoId", draggedTodoId);
  }, [isDragging, draggedTodoId]);

  /* ドラッグ&ドロップ */
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      /* ドラッグ&ドロップ */
      ref={setNodeRef}
      className={`p-4 rounded shadow ${isOver ? "bg-blue-100" : "bg-gray-200"}`}
    >
      <div className="flex items-center text-lg font-bold mb-4">
        <h2 className="text-xl font-semibold">{status}</h2>
        <div
          className={`flex items-center justify-center ml-5 text-sm text-white h-6 w-6 rounded-full ${backgroundColor}`}
        >
          {todos.length}
        </div>
      </div>
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            handleDelete={handleDelete}
          />
        ))}
        {/* // プレースホルダー表示 */}
        {isDragging && draggedTodoId && <div style={{ height: "104px" }} />}
      </div>
    </div>
  );
};
