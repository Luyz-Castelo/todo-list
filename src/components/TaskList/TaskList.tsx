import { Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NEW_TASK } from "../../constants/dispatches";
import { Task } from "../../helpers/interfaces/task.interface";
import { dispatcher } from "../../helpers/dispatcher"

export const  TaskList = () => {
  const exampleTask: Task[] = [{taskName: 'lavar louça', dueDate: 'hoje'}];
  const [tasks, setTasks] = useState(exampleTask);

  useEffect(() => {
    dispatcher.listen(NEW_TASK, (newTask: Task) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
  }, []);
    
  return (
    <Container sx={{ backgroundColor: '#222222' }}>
      <Typography variant='h4' mt={'1rem'} paddingTop={2}>Task List</Typography>
      <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2} mt={2}>
        {tasks.map((task, index) => (
          <Container key={index} sx={{ display: 'block', borderRadius: '1.5rem', backgroundColor: 'brown' }}>
            <div>{task.taskName}</div>
            <div>{task.dueDate}</div>
          </Container>
        ))}
      </Stack>
      <Container sx={{padding: '30px 0px !important'}}>{localStorage.getItem('taskList')}</Container>
    </Container>
  )
}