import { Button, Container, TextField } from "@mui/material"
import { StyledBox, StyledContainer, StyledTextField, StyledTypography } from "./CreateTask.style"
import { useState } from "react"
import { dispatcher } from "../../helpers/dispatcher"
import { NEW_TASK } from "../../constants/dispatches"
import { Task } from "../../helpers/interfaces/task.interface"

export const CreateTask = () => {

  const [taskName, setTaskName] = useState('')
  const [dueDate, setDueDate] = useState('')
  
  const dispatchNewTask = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const newTask: Task = { taskName, dueDate }
    dispatcher.dispatch(NEW_TASK, newTask)
  }

  return (
    <Container>
      <StyledTypography variant='h3'>
        Create New Task
      </StyledTypography>
      
      <Container>
        <StyledBox component='form' onSubmit={e => dispatchNewTask(e)}>
          <StyledContainer id='inputs'>
            <StyledTextField required name='taskName' id='standard-required' label='Name' onChange={(e) => setTaskName(e.target.value)} />
            <TextField required name='dueDate' id='standard-required' label='Due Date' onChange={(e) => setDueDate(e.target.value)} />
          </StyledContainer>
          <StyledContainer>
            <Button variant='contained' type='submit' color='primary'>Create Task</Button>
          </StyledContainer>
        </StyledBox>
      </Container>
    </Container>
  )
}
