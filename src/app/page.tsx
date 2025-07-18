"use client";

import React, { useState } from "react";
import { TodoBoard } from "../components/TodoBoard";
import { AddTodoModal } from "../components/AddTodoModal";
import { Todo, Category, DueDateFilter } from "../types/todo";
import { Status } from "../types/status";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<DueDateFilter>("ALL");

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
      status: "TODO",
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
    // console.log(newTodos);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ALL") return true;

    if (!todo.dueDate) return false;

    const today = new Date();
    const dueDate = new Date(todo.dueDate);

    // 時間を無視して日付だけ比較するために0時にリセット
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
          <select
            className="block ml-auto border px-4 py-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value as DueDateFilter)}
          >
            <option value="ALL">すべて</option>
            <option value="TODAY">今日中</option>
            <option value="WEEK">1週間以内</option>
            <option value="OVERDUE">期限切れ</option>
          </select>
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
