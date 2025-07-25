"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { StatusSection } from "./StatusSection";
import { TodoCard } from "./TodoCard";
import { Todo, Status } from "../types/todo";

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
    if (!over) {
      // ドロップ先が存在しない → 枠外に落とした → 元に戻す（stateは変更しない）
      setActiveTodo(null); // UIをリセット
      return;
    }

    // ドロップ先がTodoカードの場合
    const overTodo = todos.find((todo) => todo.id === over.id);
    if (overTodo) {
      // ステータスが同じなら並べ替え、違えば移動＋並べ替え
      setTodos((prev) => {
        const oldIndex = prev.findIndex((todo) => todo.id === active.id);
        const newIndex = prev.findIndex((todo) => todo.id === over.id);
        const updated = [...prev];
        // ステータス変更
        updated[oldIndex] = { ...updated[oldIndex], status: overTodo.status };
        // 並べ替え
        return arrayMove(updated, oldIndex, newIndex);
      });
    } else {
      // ドロップ先がカラム（StatusSection）の場合
      const overStatus = over.id as Status;
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === active.id ? { ...todo, status: overStatus } : todo
        )
      );
    }
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
