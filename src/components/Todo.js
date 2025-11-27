import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Todo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdateTodo] = useState({
    title: todo.title,
    detail: todo.detail,
  });

  const { todos, setTodos } = useContext(TodosContext);

  // event handler for check button
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfrim() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, detail: updatedTodo.detail };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateDialog(false);
  }

  function handleDeleteConfrim() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setShowDeleteDialog(false);
  }

  // event handler for check button

  return (
    <>
      {/* delete model dialog  */}

      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bu İşlemi Gerçekten Silmek İstiyor musunuz?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bu işlem geri alinamaz.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>HAYİR</Button>
          <Button autoFocus onClick={handleDeleteConfrim}>
            EVET
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete model  */}

      {/* update dialog  */}

      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bu Görev Gerçekten Güncellemek İstiyor musunuz?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label="Görev Başliği"
          fullWidth
          variant="standard"
          value={updatedTodo.title}
          onChange={(e) => {
            setUpdateTodo({ ...updatedTodo, title: e.target.value });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label="Görev Detayi"
          fullWidth
          variant="standard"
          value={updatedTodo.detail}
          onChange={(e) => {
            setUpdateTodo({ ...updatedTodo, detail: e.target.value });
          }}
        />

        <DialogActions>
          <Button onClick={handleUpdateClose}>HAYİR</Button>
          <Button autoFocus onClick={handleUpdateConfrim}>
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 4,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.completed ? "line-through" : "none",
                  opacity: todo.completed ? 0.5 : 1,
                }}
              >
                {todo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.detail}
              </Typography>
            </Grid>

            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* check icon button */}

              <IconButton
                onClick={handleCheckClick}
                className="iconButton"
                aria-label="check"
                style={{
                  color: todo.completed ? "white" : "#1769aa",
                  background: todo.completed ? "#1769aa" : "white",
                  border: "solid #1769aa 3px",
                }}
              >
                {todo.completed ? (
                  <CheckCircleIcon style={{ fontSize: 28 }} />
                ) : (
                  <CheckIcon style={{ fontSize: 28 }} />
                )}
              </IconButton>

              {/* check icon button */}

              {/*edit button  */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="edit"
                style={{
                  color: "#8bc34a",
                  background: "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>

              {/*delete button */}

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlinedIcon />
              </IconButton>

              {/*delete button */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
