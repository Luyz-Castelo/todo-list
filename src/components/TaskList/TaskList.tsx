import { Table, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from "react";
import { NEW_TASK } from "../../constants/dispatches";
import { Task } from "../../helpers/interfaces/task.interface";
import { dispatcher } from "../../helpers/dispatcher"
import { StyledContainer } from "./TaskList.style";

const baseTask: Task = { taskName: 'Example task' , dueDate: new Date().toUTCString() }

const handleDoneTask = (task: Task) => {
  console.log('handleDoneTask', task)
}

const handleDeleteTask = (task: Task) => {
  console.log('handleDeleteTask', task)
}

export const TaskList = () => {
  const [tasks, setTasks] = useState([baseTask]);

  useEffect(() => {
    dispatcher.listen(NEW_TASK, (newTask: Task) => {
      setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    });
  }, []);
    
  return (
    <StyledContainer>
      <Typography variant='h4'>Task List</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>              
              <TableCell>Due Date</TableCell>              
              <TableCell align='right'>Actions</TableCell>              
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task: Task, index: number) => (
              <TableRow key={index}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell align='right'>
                  <DoneIcon onClick={() => handleDoneTask(task)} />
                  <DeleteIcon onClick={() => handleDeleteTask(task)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  )
}