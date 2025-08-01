"use client";

import React, { useState } from "react";

import { TodoBoard } from "../components/TodoBoard";
import { AddTodoModal } from "../components/AddTodoModal";
import { DueDateFilter } from "../components/DueDateFilter";
import { Todo, Status, Category, DueDate } from "../types/todo";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<DueDate>("ALL");

  const handleToggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const onAdd = (input: {
    title: string;
    category: Category;
    dueDate?: Date;
    status: Status;
  }) => {
    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => Number(t.id))) + 1 : 1;

    const todo: Todo = {
      id: String(newId),
      title: input.title,
      category: input.category,
      dueDate: input.dueDate,
      status: input.status,
    };

    setTodos([...todos, todo]);
  };

  const onEdit = (input: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === input.id ? input : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ALL") return true;

    if (!todo.dueDate) return false;

    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    const resetTime = (date: Date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayDate = resetTime(today);
    const dueDateOnly = resetTime(dueDate);

    if (filter === "TODAY") {
      return dueDateOnly.getTime() === todayDate.getTime();
    }

    if (filter === "WEEK") {
      const weekLater = new Date(todayDate);
      weekLater.setDate(weekLater.getDate() + 7);
      return dueDateOnly >= todayDate && dueDateOnly <= weekLater;
    }

    if (filter === "OVERDUE") {
      return dueDateOnly < todayDate;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-5xl font-bold">TODOリスト</h1>

        <div className="flex gap-4">
          {/* フィルターセレクトボックス */}
          <DueDateFilter filter={filter} setFilter={setFilter} />
          {/* 新規追加ボタン */}
          {!isFormVisible && (
            <button
              onClick={handleToggleForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              ＋
            </button>
          )}
          {/* 追加フォーム */}
          {isFormVisible && (
            <AddTodoModal
              isFormVisible={isFormVisible}
              onAdd={onAdd}
              onClose={handleToggleForm}
            />
          )}
        </div>
      </div>
      {/* ステータスごとの表示エリア */}
      <TodoBoard
        todos={filteredTodos}
        setTodos={setTodos}
        onEdit={onEdit}
        handleDelete={handleDelete}
      />
    </main>
  );
}
