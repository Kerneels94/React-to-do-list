import { FaTrash, FaPenSquare } from "react-icons/fa";

const TodoList = ({
  id,
  title,
  deleteTodoItem,
  editingValue,
  setEditingValue,
  editTodoData,
  setIsEditing,
  isEditing,
  handleCheckbox,
  checked,
}) => {
  return (
    <>
      {isEditing ? (
        <li className="flex flex-row gap-5 items-center justify-center">
          <label className="flex gap-2">
            <input
              type="text"
              name="editTodoitem"
              placeholder="Edit Todo Item"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
            />
            <p key={id}>{title}</p>
          </label>
          <div className="button-container flex gap-2">
            <button
              className="px-2 py-2 text-xl hover:text-blue-300"
              type="submit"
              onClick={() => editTodoData(id)}
            >
              <FaPenSquare />
            </button>
          </div>
        </li>
      ) : (
        <li className="flex flex-row gap-1 items-center justify-center">
          <label className="flex gap-1">
            <input type="checkbox" onChange={handleCheckbox} value={checked} />
            <p key={id}>{title}</p>
          </label>
          <div className="button-container flex flex-1">
            <button
              className="px-2 py-2 text-xl hover:text-blue-300"
              type="submit"
              onClick={() => setIsEditing(true)}
            >
              <FaPenSquare />
            </button>
            <button
              className="px-2 py-2 text-xl hover:text-blue-300"
              type="submit"
              onClick={() => deleteTodoItem(id)}
            >
              <FaTrash />
            </button>
          </div>
        </li>
      )}
    </>
  );
};

export default TodoList;
