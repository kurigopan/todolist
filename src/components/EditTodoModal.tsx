import { BaseTodoModal } from "./BaseTodoModal";
import { Todo } from "../types/todo";

type Props = {
  isFormVisible: boolean;
  onEdit: (input: Todo) => void;
  onClose: () => void;
  todo: Todo;
};

export const EditTodoModal: React.FC<Props> = ({
  isFormVisible,
  onEdit,
  onClose,
  todo,
}) => {
  return (
    <BaseTodoModal
      isFormVisible={isFormVisible}
      onEdit={onEdit}
      todo={todo}
      onClose={onClose}
      mode="EDIT"
    />
  );
};
