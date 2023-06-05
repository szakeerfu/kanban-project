import React from "react";
import { Grid } from "@mui/material";
import Column from "./Column";

const Board = ({ boardData, moveTask }) => {
    return (
        <Grid container spacing={2}>
            <Column title="To Do" tasks={boardData.todo} moveTask={moveTask} sourceColumn="todo" destinationColumn="inProgress" />
            <Column title="In Progress" tasks={boardData.inProgress} moveTask={moveTask} sourceColumn="inProgress" destinationColumn="done" />
            <Column title="Done" tasks={boardData.done} />
        </Grid>
    );
};

export default Board;