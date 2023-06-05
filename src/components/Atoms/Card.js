import React from "react";
import { Paper, Typography } from "@mui/material";

const Card = ({ title, description, dueDate, priority, assignedTo }) => {
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography>{description}</Typography>
            <Typography>Due Date: {dueDate}</Typography>
            <Typography>Priority: {priority}</Typography>
            <Typography>Assigned To: {assignedTo}</Typography>
        </Paper>
    );
};

export default Card;