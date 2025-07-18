import { Todo } from "../types/todo";
import { BaseTodoModal } from "./BaseTodoModal";

type Props = {
  isFormVisible: boolean;
  onEdit: (input: Todo) => void; // Optional for edit mode
  onClose: () => void;
  todo: Todo; // The todo item to edit
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
      mode="edit"
    />
  );
};
