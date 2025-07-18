import { Category } from "../types/todo";
import { BaseTodoModal } from "./BaseTodoModal";
import { Status } from "../types/status";

type Props = {
  isFormVisible: boolean;
  onAdd: (input: {
    title: string;
    category: Category;
    date?: string;
    status: Status;
  }) => void;
  onClose: () => void;
};

export const AddTodoModal: React.FC<Props> = ({
  isFormVisible,
  onAdd,
  onClose,
}) => {
  return (
    <BaseTodoModal
      isFormVisible={isFormVisible}
      onAdd={onAdd}
      onClose={onClose}
      mode="new"
    />
  );
};
