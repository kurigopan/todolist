import { DueDate } from "../types/todo";

type Props = {
  filter: DueDate;
  setFilter: (filter: DueDate) => void;
};

export const DueDateFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <select
      className="block ml-auto border px-4 py-2 rounded"
      value={filter}
      onChange={(e) => setFilter(e.target.value as DueDate)}
    >
      <option value="ALL">すべて</option>
      <option value="TODAY">今日中</option>
      <option value="WEEK">1週間以内</option>
      <option value="OVERDUE">期限切れ</option>
    </select>
  );
};
