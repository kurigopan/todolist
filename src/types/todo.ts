import { Status } from "./status";

export type Todo = {
  id: string;
  title: string;
  status: Status;
  dueDate?: Date;
  category: Category;
};

export type Category = "仕事" | "家事" | "プライベート";

export type DueDateFilter = "ALL" | "TODAY" | "WEEK" | "OVERDUE";
