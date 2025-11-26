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

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  const todosJsx = todos.map((t) => <Todo key={t.id} todo={t} />);

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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5">Görevlerim</Typography>
          <Divider sx={{ marginY: 2 }} />

          {/* filtter buttons */}

          <ToggleButtonGroup
            //value={alignment}
            exclusive
            //onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Bütün
            </ToggleButton>

            <ToggleButton value="center" aria-label="centered">
              Tamamlanan
            </ToggleButton>

            <ToggleButton value="left" aria-label="left aligned">
              Tamamlanmayan
            </ToggleButton>
          </ToggleButtonGroup>

          {/*filter  */}

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
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  handleAddClick();
                }}
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
