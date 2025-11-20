import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
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
      <TodoList />
    </div>
  );
}

export default App;
