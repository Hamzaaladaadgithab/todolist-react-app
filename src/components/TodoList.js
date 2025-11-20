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


//COMPONENT
import Todo from "./Todo";

export default function TodoList() {
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275  }}>
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

            <ToggleButton value="right" aria-label="right aligned">
              Tamamlanmayan
            </ToggleButton>
          </ToggleButtonGroup>

          {/*filter  */}

          {/* all todos  */}

          <Todo />

          {/* all todos  */}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
