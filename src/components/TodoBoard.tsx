import { Todo } from "../types/todo";
import { Status } from "../types/status";
import { StatusSection } from "./StatusSection";

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

export const TodoBoard: React.FC<Props> = ({ todos, onEdit, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statuses.map((status) => (
        <StatusSection
          key={status}
          status={status}
          todos={todos.filter((todo) => todo.status === status)}
          backgroundColor={statusStyles[status]}
          onEdit={onEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};
