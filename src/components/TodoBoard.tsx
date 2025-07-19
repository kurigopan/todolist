"use client"; /* ドラッグ&ドロップ */

import { Todo } from "../types/todo";
import { Status } from "../types/status";
import { StatusSection } from "./StatusSection";
import { TodoCard } from "./TodoCard";
/* ドラッグ&ドロップ */
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onEdit: (input: Todo) => void;
  handleDelete: (id: string) => void;
};
const statuses: Status[] = ["TODO", "IN PROGRESS", "DONE"];
const statusStyles: Record<Status, string> = {
  TODO: "bg-purple-300",
  "IN PROGRESS": "bg-purple-500",
  DONE: "bg-purple-700",
};

export const TodoBoard: React.FC<Props> = ({
  todos,
  setTodos,
  onEdit,
  handleDelete,
}) => {
  /* ドラッグ&ドロップ */
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const draggedId = event.active.id;
    const todo = todos.find((t) => t.id === draggedId);
    if (todo) {
      setActiveTodo(todo);
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overStatus = over.id as Status;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === activeId ? { ...todo, status: overStatus } : todo
      )
    );
    setActiveTodo(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <StatusSection
            key={status}
            status={status}
            todos={
              todos
                .filter((todo) => todo.status === status)
                .filter((todo) => !(activeTodo && todo.id === activeTodo.id)) // ドラッグ中は除外
            }
            backgroundColor={statusStyles[status]}
            onEdit={onEdit}
            handleDelete={handleDelete}
            isDragging={!!activeTodo}
            draggedTodoId={activeTodo?.id}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTodo ? (
          <div className="opacity-80">
            <TodoCard
              todo={activeTodo}
              onEdit={onEdit}
              handleDelete={handleDelete}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
