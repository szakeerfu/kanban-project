import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Paper, Button, TextField } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./KanbanBoard.module.css";

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
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    const { title, description, dueDate } = taskForm;
    if (title && description && dueDate) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
      };
      setBoardData((prevData) => ({
        ...prevData,
        todo: [...prevData.todo, newTask],
      }));
      setTaskForm({
        title: "",
        description: "",
        dueDate: "",
      });
    }
  };

  const moveTask = (sourceColumn, destinationColumn, taskId) => {
    setBoardData((prevData) => {
      const task = prevData[sourceColumn].find((task) => task.id === taskId);

      if (task) {
        const updatedSourceTasks = prevData[sourceColumn].filter(
          (task) => task.id !== taskId
        );
        const updatedDestinationTasks = [...prevData[destinationColumn], task];

        const updatedDestinationTasksWithColor = updatedDestinationTasks.map(
          (task) => {
            let color;
            switch (destinationColumn) {
              case "todo":
                color = "green";
                break;
              case "inProgress":
                color = "yellow";
                break;
              case "done":
                color = "red";
                break;
              default:
                color = "";
            }
            return { ...task, color };
          }
        );

        return {
          ...prevData,
          [sourceColumn]: updatedSourceTasks,
          [destinationColumn]: updatedDestinationTasksWithColor,
        };
      }

      return prevData;
    });
  };

  const handleDeleteTask = (taskId) => {
    setBoardData((prevData) => ({
      ...prevData,
      done: prevData.done.filter((task) => task.id !== taskId),
    }));
  };

  const toggleAddTaskForm = () => {
    setShowAddTaskForm((prevState) => !prevState);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;
    const taskId = parseInt(result.draggableId);

    moveTask(sourceColumn, destinationColumn, taskId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 2 }} className={styles.todo}>
            <h2>To Do</h2>
            <Droppable droppableId="todo">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {boardData.todo.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${styles.task} ${styles[task.color]}`}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p>Due Date: {task.dueDate}</p>
                          <p>Priority: {task.priority}</p>
                          <p>Assigned To: {task.assignedTo}</p>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              moveTask("todo", "inProgress", task.id)
                            }
                          >
                            Start
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className={styles["task-form"]}>
              {showAddTaskForm ? (
                <>
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
                  <Button variant="contained" onClick={handleAddTask}>
                    Add
                  </Button>
                </>
              ) : (
                <Button variant="outlined" onClick={toggleAddTaskForm}>
                  Add Task
                </Button>
              )}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper
            elevation={3}
            sx={{ padding: 2 }}
            className={styles.inProgress}
          >
            <h2>In Progress</h2>
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {boardData.inProgress.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${styles.task} ${styles[task.color]}`}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p>Due Date: {task.dueDate}</p>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              moveTask("inProgress", "done", task.id)
                            }
                          >
                            Complete
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 2 }} className={styles.done}>
            <h2>Done</h2>
            <Droppable droppableId="done">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {boardData.done.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${styles.task} ${styles[task.color]}`}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p>Due Date: {task.dueDate}</p>
                          <Button
                            variant="outlined"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Paper>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default KanbanBoard;
