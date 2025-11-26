import "./App.css";
import TodoList from "./components/TodoList";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

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

  return (
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
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoList todos={todos} setTodos={setTodos} />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
