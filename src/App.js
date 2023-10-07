import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import "./App.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const [error, setError] = useState(false);

  const handleAddTodo = () => {
    if ((!newTitle, !newDescription)) {
      setError(true);
      return false;
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    console.log(newTodoItem, "new todo");

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    console.log(updatedTodoArr, "updated todo");
    setAllTodos(updatedTodoArr);

    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    console.log(index, "deleted todo");

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yy = now.getFullYear();
    let completedOn = dd + "-" + mm + "-" + yy;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...CompletedTodos];
    updatedCompletedArr.push(filteredItem);
    console.log(updatedCompletedArr, "updated completed todo");
    setCompletedTodos(updatedCompletedArr);

    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
    handleDeleteTodo(index);
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodo = [...CompletedTodos];
    reducedCompletedTodo.splice(index, 1);
    console.log(reducedCompletedTodo, "deleted completed todo");

    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodo)
    );
    setCompletedTodos(reducedCompletedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>To-Do-List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the title of your to do?"
            />
          </div>
          <div>
            {error && !newTitle && (
              <span className="invalid-input">Enter Valid Title</span>
            )}
          </div>

          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your to do ?"
            />
          </div>
          <div>
            {error && !newDescription && (
              <span className="invalid-input">Enter Valid Description</span>
            )}
          </div>

          <div style={{ display: "flex" }}>
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div>
        {isCompleteScreen === false && (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>              
                {allTodos.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleDeleteTodo(index)}
                          title="Delete?"
                        />
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => handleComplete(index)}
                          title="Complete?"
                        />
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        )}
        </div>

        <div>
        {isCompleteScreen === true && (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Completed On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>             
                {CompletedTodos.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.completedOn}</td>
                      <td>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleDeleteCompletedTodo(index)}
                        />
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
