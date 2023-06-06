import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Paper, Button, TextField } from "@mui/material";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

import styles from './KanbanBoard.module.css'



const KanbanBoard = () => {
    const [boardData, setBoardData] = useState({
        todo: [],
        inProgress: [],
        done: [],
    });
    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        assignedTo: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTaskForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleAddTask = () => {
        const { title, description, dueDate, priority, assignedTo } = taskForm;
        if (title && description && dueDate && priority && assignedTo) {
            const newTask = {
                id: Date.now(),
                title,
                description,
                dueDate,
                priority,
                assignedTo,
            };
            setBoardData((prevData) => ({
                ...prevData,
                todo: [...prevData.todo, newTask],
            }));
            setTaskForm({
                title: "",
                description: "",
                dueDate: "",
                priority: "",
                assignedTo: "",
            });
        }
    };

    const moveTask = (sourceColumn, destinationColumn, taskId) => {
        const sourceTasks = [...boardData[sourceColumn]];
        const destinationTasks = [...boardData[destinationColumn]];
        const task = sourceTasks.find((task) => task.id === taskId);

        if (task) {
            const updatedSourceTasks = sourceTasks.filter((task) => task.id !== taskId);
            setBoardData((prevData) => ({
                ...prevData,
                [sourceColumn]: updatedSourceTasks,
            }));

            const updatedDestinationTasks = [...destinationTasks, task];
            setBoardData((prevData) => ({
                ...prevData,
                [destinationColumn]: updatedDestinationTasks,
            }));
        }
    };
    const handleDeleteTask = (taskId) => {
        setBoardData((prevData) => ({
            ...prevData,
            done: prevData.done.filter((task) => task.id !== taskId),
        }));
    };

    
    
    const openDescriptionBox = () => {
      return (
        <div>openDescriptionBox</div>
      )
    }
    

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <h2>To Do</h2>
                    {boardData.todo.map((task) => (
                        <div key={task.id} className={styles.task}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Due Date: {task.dueDate}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Assigned To: {task.assignedTo}</p>
                            <Button variant="outlined" onClick={() => moveTask("todo", "inProgress", task.id)}>
                                Start
                            </Button>

                            <div className={styles.EditIcon}>
                                <Fab onClick={openDescriptionBox} color="green" aria-label="edit" size="small">
                                    <EditIcon style={{ fontSize: 20 }} />
                                </Fab>
                            </div>

                        </div>
                    ))}
                    <div className={styles["task-form"]}>
                        <h3>Add Task</h3>
                        <TextField
                            name="title"
                            label="Title"
                            value={taskForm.title}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="description"
                            label="Description"
                            value={taskForm.description}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="dueDate"
                            label="Due Date"
                            value={taskForm.dueDate}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="priority"
                            label="Priority"
                            value={taskForm.priority}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="assignedTo"
                            label="Assigned To"
                            value={taskForm.assignedTo}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <Button variant="contained" onClick={handleAddTask}>
                            Add
                        </Button>
                    </div>
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <h2>In Progress</h2>
                    {boardData.inProgress.map((task) => (
                        <div key={task.id} className="task">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Due Date: {task.dueDate}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Assigned To: {task.assignedTo}</p>
                            <Button variant="outlined" onClick={() => moveTask("inProgress", "done", task.id)}>
                                Complete
                            </Button>
                        </div>
                    ))}
                </Paper>
            </Grid>

            <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <h2>Done</h2>
                    {boardData.done.map((task) => (
                        <div key={task.id} className={styles.task}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Due Date: {task.dueDate}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Assigned To: {task.assignedTo}</p>
                            <Button
                                variant="outlined"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default KanbanBoard;   