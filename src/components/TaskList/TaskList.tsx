import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from "react";
import { NEW_TASK } from "../../constants/dispatches";
import { Task } from "../../helpers/interfaces/task.interface";
import { dispatcher } from "../../helpers/dispatcher"
import { StyledContainer } from "./TaskList.style";
import { generateRandomUuid } from "../../helpers/generateRandomUuid";

const now = new Date();
const baseCompleteTask: Task = { id: generateRandomUuid(), taskName: 'Enter the web site' , dueDate: now.toUTCString(), isComplete: false }
const baseIncompleteTask: Task = { id: generateRandomUuid(), taskName: 'Understand this website' , dueDate: new Date(now.setDate(now.getDate() + 1)).toUTCString(), isComplete: false }

const handleDoneTask = (task: Task, setCompleteTasks: Function, setIncompleteTasks: Function) => {
  task.isComplete = !task.isComplete;

  setIncompleteTasks((prevTasks: Task[]) => prevTasks.filter(prevTask => prevTask.id !== task.id))
  setCompleteTasks((prevTasks: Task[]) => [...prevTasks, task])
}

const handleRemoveTask = (task: Task, setCompleteTasks: Function, setIncompleteTasks: Function) => {
  task.isComplete = !task.isComplete;

  setCompleteTasks((prevTasks: Task[]) => prevTasks.filter(prevTask => prevTask.id !== task.id))
  setIncompleteTasks((prevTasks: Task[]) => [...prevTasks, task])
}

const handleDeleteTask = (task: Task, setTasks: Function) => {
  setTasks((prevTasks: Task[]) => prevTasks.filter(prevTask => prevTask.id !== task.id))
}

export const TaskList = () => {
  const [completeTasks, setCompleteTasks] = useState([baseCompleteTask]);
  const [incompleteTasks, setIncompleteTasks] = useState([baseIncompleteTask]);

  useEffect(() => {
    dispatcher.listen(NEW_TASK, (newTask: Task) => {
      newTask.isComplete ? setCompleteTasks((prevTasks: Task[]) => [...prevTasks, newTask]) : setIncompleteTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    });
  }, []);
    
  return (
    <StyledContainer>
      <Typography variant='h4'>Completed Tasks</Typography>
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
            {completeTasks.map((task: Task) => (
              <TableRow key={task.id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell align='right'>
                  <RemoveIcon onClick={() => handleRemoveTask(task, setCompleteTasks, setIncompleteTasks)} />
                  <DeleteIcon onClick={() => handleDeleteTask(task, setCompleteTasks)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant='h4' mt={4}>Incomplete Tasks</Typography>
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
          {incompleteTasks.map((task: Task) => (
              <TableRow key={task.id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell align='right'>
                  <DoneIcon onClick={() => handleDoneTask(task, setCompleteTasks, setIncompleteTasks)} />
                  <DeleteIcon onClick={() => handleDeleteTask(task, setIncompleteTasks)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  )
}