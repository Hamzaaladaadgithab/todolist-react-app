import * as React from "react";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useEffect } from "react";
//COMPONENT
import Todo from "./Todo";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");

  //filtrealeme için local storage dan verileri çekme

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = todos.filter((t) => t.completed);
  const incompletedTodos = todos.filter((t) => !t.completed);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = incompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => <Todo key={t.id} todo={t} />);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  function changeDisplayedTodosType(event, newType) {
    setDisplayedTodosType(newType);
  }

  //filtrealeme için local storage dan verileri çekme

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      detail: "",
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "90vh",
          overflowY: "scroll",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h5">Görevlerim</Typography>
          <Divider sx={{ marginY: 2 }} />

          {/* filtter buttons */}

          <ToggleButtonGroup
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedTodosType}
            aria-label="text alignment"
          >
            <ToggleButton value="all">Bütün</ToggleButton>

            <ToggleButton value="completed">Tamamlanan</ToggleButton>

            <ToggleButton value="non-completed">Tamamlanmayan</ToggleButton>
          </ToggleButtonGroup>

          {/*filter buttons   */}

          {/* all todos  */}

          {todosJsx}

          {/* all todos  */}

          {/* input + add button  */}

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={9}>
              <input
                type="text"
                placeholder="Yeni görev ekle..."
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%", marginLeft: "15px" }}
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.trim() === ""}
              >
                Ekle
              </Button>
            </Grid>
          </Grid>
          {/* input + add button  */}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
