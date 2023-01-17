import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from "react";
import { NEW_TASK } from "../../constants/dispatches";
import { Task } from "../../helpers/interfaces/task.interface";
import { dispatcher } from "../../helpers/dispatcher"
import { StyledContainer, StyledTableCell, StyledTypography } from "./TaskList.style";
import { generateRandomUuid } from "../../helpers/generateRandomUuid";

const createBaseTasks = () => {
  const now = new Date();
  const baseCompleteTask: Task = { id: generateRandomUuid(), taskName: 'Enter the web site' , dueDate: now.toUTCString(), isComplete: false };
  const baseIncompleteTask: Task = { id: generateRandomUuid(), taskName: 'Understand this website' , dueDate: new Date(now.setDate(now.getDate() + 1)).toUTCString(), isComplete: false };

  return { baseCompleteTask, baseIncompleteTask };
}

const handleDoneTask = (task: Task, setCompleteTasks: React.Dispatch<React.SetStateAction<Task[]>>, setIncompleteTasks: React.Dispatch<React.SetStateAction<Task[]>>, completeTasksKey: string, incompleteTasksKey: string) => {
  task.isComplete = !task.isComplete;

  setIncompleteTasks((prevTasks: Task[]) => {
    const tasks = prevTasks.filter(prevTask => prevTask.id !== task.id);
    setTasksOnLocalStorage(incompleteTasksKey, tasks);
    return tasks;
  });
  setCompleteTasks((prevTasks: Task[]) => {
    const tasks = [...prevTasks, task];
    setTasksOnLocalStorage(completeTasksKey, tasks);
    return tasks;
  });
}

const handleUndoneTask = (task: Task, setCompleteTasks: React.Dispatch<React.SetStateAction<Task[]>>, setIncompleteTasks: React.Dispatch<React.SetStateAction<Task[]>>, completeTasksKey: string, incompleteTasksKey: string) => {
  task.isComplete = !task.isComplete;

  setCompleteTasks((prevTasks: Task[]) => {
    const tasks = prevTasks.filter(prevTask => prevTask.id !== task.id);
    setTasksOnLocalStorage(completeTasksKey, tasks);
    return tasks;
  });
  setIncompleteTasks((prevTasks: Task[]) => {
    const tasks = [...prevTasks, task];
    setTasksOnLocalStorage(incompleteTasksKey, tasks);
    return tasks;
  });
}

const handleDeleteTask = (task: Task, setTasks: React.Dispatch<React.SetStateAction<Task[]>>, key: string) => {
  setTasks((prevTasks: Task[]) => {
    const tasks = prevTasks.filter(prevTask => prevTask.id !== task.id);
    setTasksOnLocalStorage(key, tasks);
    return tasks;
  })
}

const getTasksFromLocalStorage = (key: string): Task[] => {
  const tasksInStorage = localStorage.getItem(key);
  return tasksInStorage ? JSON.parse(tasksInStorage) : null;
}

const setTasksOnLocalStorage = (key: string, tasks: Task[]) => {
  localStorage.setItem(key, JSON.stringify(tasks));
}

export const TaskList = () => {
  const completeTasksKey = 'completeTasks';
  const incompleteTasksKey = 'incompleteTasks';

  const completeTasksInStorage = getTasksFromLocalStorage('completeTasks');
  const incompleteTasksInStorage = getTasksFromLocalStorage('incompleteTasks');
  const { baseCompleteTask, baseIncompleteTask } = createBaseTasks();

  const [completeTasks, setCompleteTasks] = useState(completeTasksInStorage || [baseCompleteTask]);
  const [incompleteTasks, setIncompleteTasks] = useState(incompleteTasksInStorage || [baseIncompleteTask]);

  useEffect(() => {
    dispatcher.listen(NEW_TASK, (newTask: Task) => {
      if(newTask.isComplete) {
        setCompleteTasks((prevTasks: Task[]) => {
          setTasksOnLocalStorage(completeTasksKey, [...prevTasks, newTask]);
          return [...prevTasks, newTask];
        });
      } else {
        setIncompleteTasks((prevTasks: Task[]) => {
          setTasksOnLocalStorage(incompleteTasksKey, [...prevTasks, newTask]);
          return [...prevTasks, newTask];
        });
      }
    });
  }, []);
    
  return (
    <StyledContainer>
      <StyledTypography variant='h4'>Completed Tasks</StyledTypography>
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
                <StyledTableCell align='right'>
                  <RemoveIcon onClick={() => handleUndoneTask(task, setCompleteTasks, setIncompleteTasks, completeTasksKey, incompleteTasksKey)} />
                  <DeleteIcon onClick={() => handleDeleteTask(task, setCompleteTasks, completeTasksKey)} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StyledTypography variant='h4' mt={4}>Incomplete Tasks</StyledTypography>
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
                <StyledTableCell align='right'>
                  <DoneIcon onClick={() => handleDoneTask(task, setCompleteTasks, setIncompleteTasks, completeTasksKey, incompleteTasksKey)} />
                  <DeleteIcon onClick={() => handleDeleteTask(task, setIncompleteTasks, incompleteTasksKey)} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  )
}