import "./App.css";
import TodoList from "./components/TodoList";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import MySnackBar from "./MySnackBar";
import * as React from "react";
import { ToastContext } from "./contexts/ToastContext";

const initialTodos = [
  {
    id: uuidv4(),
    title: "Birinci Görev",
    detail: "Birinci Görev detaylari",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "İkinci Görev",
    detail: "İkinci Görev detaylari",
    completed: true,
  },
  {
    id: uuidv4(),
    title: "Üçüncü Görev",
    detail: "Üçüncü Görev detaylari",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function showHideToast(message) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(182, 231, 182, 1)",
          height: "100vh",
        }}
      >
        <MySnackBar open={open} message={message} />
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList todos={todos} setTodos={setTodos} />
        </TodosContext.Provider>
      </div>
    </ToastContext.Provider>
  );
}

export default App;
