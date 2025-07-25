export type Todo = {
  id: string;
  title: string;
  status: Status;
  dueDate?: Date;
  category: Category;
};
export type Status = "TODO" | "IN PROGRESS" | "DONE";

export type Category = "WORK" | "HOUSEWORK" | "PRIVATE";

export type DueDateFilter = "ALL" | "TODAY" | "WEEK" | "OVERDUE";
