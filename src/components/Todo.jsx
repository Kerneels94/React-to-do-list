import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import axios from "axios";
import TodoList from "./TodoList";

const token =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTM5OTY0NzksImlkIjoiZTcwZTcxZjEtNGNhMC0xMWVlLTgwZDUtMTJiNWY3OWJkNDUzIn0.HQdquK9YTGid7u0bhj9RBylIA7UkCcoQ1LvrnC1YFOOmorQ81HiZZZ4MzHv8N0OopZ2bf9QsWUM9jHr3zm-LAw";
const url = "https://todos.appsquare.io";

const Todo = () => {
  // Create state variables
  const [userInputField, setUserInputField] = useState("");
  const [list, setList] = useState([]);
  // Editing state
  const [editingValue, setEditingValue] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [checked, setChecked] = useState(false);

  let data = {
    title: userInputField,
    completed: checked,
  };

  // Get data from api endpoint
  const getDataFromApi = async () => {
    let res = await axios.get(`${url}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setList(res.data.todos);
  };

  // The add to do button will add the userInput value collected form the state to the todoItem array
  const addTodoItemToList = async () => {
    // Using a post request post the data to the api endpoint
    try {
      await axios.post(`${url}/todos`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // Call get data function
      getDataFromApi();
    } catch (error) {
      console.log(error);
    }

    // Update setter function of useState with the userInputValue
    setList(() => {
      return [
        ...list,
        {
          todoItemName: userInputField,
          completed: checked,
        },
      ];
    });

    // Clear input field
    setUserInputField("");
  };

  // Delete Item function
  const deleteTodoItem = async (id) => {
    // using Axios make a delete request passing in the id of the todo item so that we delete the right to-do
    try {
      await axios.delete(`${url}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Call get data function
      getDataFromApi();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit to do function
  const editTodoData = async (id) => {
    // Update data object with the edited value
    data = {
      title: editingValue,
      completed: checked,
    };

    // Using Axios patch request -> passing in the id so that react knows what id to update + the updated data
    try {
      await axios.patch(`${url}/todos/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // Call get data function
      getDataFromApi();
    } catch (error) {
      console.log(error);
    }

    // Update the list -> Make a compy of the list - adding the new edited value to the object
    setList([...list, { id: id, title: editingValue, completed: false }]);

    // Set editing state to false
    setIsEditing(false);
  };

  // Checkbox function
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setChecked(true);
    }
  };

  // Use effect
  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <>
      <div className="flex h-full flex-col space-y-10 p-10 max-w-3xl mx-auto mt-5 shadow-xl rounded-b-md">
        <div className="flex flex-col items-center justify-between">
          <h2 className="text-xl italic">A list that must be done!</h2>
          <p>
            Add a list of items you would like to{" "}
            <span className="italic text-lg text-blue-300">get done today</span>
          </p>
        </div>

        {/* Form */}
        <TodoForm
          userInputField={userInputField}
          setUserInputField={setUserInputField}
          deleteTodoItem={deleteTodoItem}
          addTodoItemToList={addTodoItemToList}
        />

        {/* Todo Items */}
        <div className="w-auto h-auto p-2 flex flex-col items-center justify-center bg-zinc-800 text-white rounded-lg dark:bg-white dark:text-zinc-800 shadow-xl">
          <ul>
            {/* if the length of the list with the todo items is === 0 display a messege else display a empty string */}
            {list.length === 0 ? <p>No to do items yet</p> : ""}
            {/* Loop through the list of todo items and display a list of items */}
            {list.map(({ id, title }) => {
              return (
                <>
                  <TodoList
                    id={id}
                    title={title}
                    deleteTodoItem={deleteTodoItem}
                    editingValue={editingValue}
                    editTodoData={editTodoData}
                    setEditingValue={setEditingValue}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    handleCheckbox={handleCheckbox}
                    checked={checked}
                  />
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
