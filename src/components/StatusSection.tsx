import { Todo } from "../types/todo";
import { Status } from "../types/status";
import { TodoCard } from "./TodoCard";
import React, { useEffect } from "react";

type Props = {
  backgroundColor: string;
  status: Status;
  todos: Todo[];
  onEdit: (input: Todo) => void;
  handleDelete: (id: string) => void;
};

export const StatusSection: React.FC<Props> = ({
  backgroundColor,
  status,
  todos,
  onEdit,
  handleDelete,
}) => {
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="bg-gray-200 p-4 rounded shadow">
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
      </div>
    </div>
  );
};
