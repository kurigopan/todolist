import { BaseTodoModal } from "./BaseTodoModal";
import { Status, Category } from "../types/todo";

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
      mode="NEW"
    />
  );
};
