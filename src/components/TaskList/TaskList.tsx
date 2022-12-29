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


const createBaseTasks = () => {
  const now = new Date();
  const baseCompleteTask: Task = { id: generateRandomUuid(), taskName: 'Enter the web site' , dueDate: now.toUTCString(), isComplete: false }
  const baseIncompleteTask: Task = { id: generateRandomUuid(), taskName: 'Understand this website' , dueDate: new Date(now.setDate(now.getDate() + 1)).toUTCString(), isComplete: false }

  return { baseCompleteTask, baseIncompleteTask }
}

const handleDoneTask = (task: Task, setCompleteTasks: React.Dispatch<React.SetStateAction<Task[]>>, setIncompleteTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  task.isComplete = !task.isComplete;

  setIncompleteTasks((prevTasks: Task[]) => prevTasks.filter(prevTask => prevTask.id !== task.id))
  setCompleteTasks((prevTasks: Task[]) => [...prevTasks, task])
}

const handleRemoveTask = (task: Task, setCompleteTasks: React.Dispatch<React.SetStateAction<Task[]>>, setIncompleteTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  task.isComplete = !task.isComplete;

  setCompleteTasks((prevTasks: Task[]) => prevTasks.filter(prevTask => prevTask.id !== task.id))
  setIncompleteTasks((prevTasks: Task[]) => [...prevTasks, task])
}

const handleDeleteTask = (task: Task, setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  setTasks((prevTasks: Task[]) => prevTasks.filter(prevTask => prevTask.id !== task.id))
}

const getTasksFromLocalStorage = (key: string): Task[] => {
  const tasksInStorage = localStorage.getItem(key);
  return tasksInStorage ? JSON.parse(tasksInStorage) : null;
}

const setTasksOnLocalStorage = (key: string, tasks: Task[]) => {
  localStorage.setItem(key, JSON.stringify(tasks));
}

export const TaskList = () => {
  const completeTasksInStorage = getTasksFromLocalStorage('completeTasks');
  const incompleteTasksInStorage = getTasksFromLocalStorage('incompleteTasks');
  const { baseCompleteTask, baseIncompleteTask } = createBaseTasks();

  const [completeTasks, setCompleteTasks] = useState(completeTasksInStorage || [baseCompleteTask]);
  const [incompleteTasks, setIncompleteTasks] = useState(incompleteTasksInStorage || [baseIncompleteTask]);

  useEffect(() => {
    dispatcher.listen(NEW_TASK, (newTask: Task) => {
      if(newTask.isComplete) {
        setCompleteTasks((prevTasks: Task[]) => {
          setTasksOnLocalStorage('completeTasks', [...prevTasks, newTask])
          return [...prevTasks, newTask]
        });
      } else {
        setIncompleteTasks((prevTasks: Task[]) => {
          setTasksOnLocalStorage('incompleteTasks', [...prevTasks, newTask])
          return [...prevTasks, newTask]
        });
      }
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