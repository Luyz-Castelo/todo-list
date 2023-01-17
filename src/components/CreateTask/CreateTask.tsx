import { Button, Container, FormControlLabel, Checkbox, TextField } from "@mui/material"
import { StyledBox, StyledContainer, StyledTypography } from "./CreateTask.style"
import { useState } from "react"
import { dispatcher } from "../../helpers/dispatcher"
import { NEW_TASK } from "../../constants/dispatches"
import { Task } from "../../helpers/interfaces/task.interface"
import { generateRandomUuid } from "../../helpers/generateRandomUuid"

export const CreateTask = () => {

  const [taskName, setTaskName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  
  const dispatchNewTask = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const newTask: Task = { id: generateRandomUuid(), taskName, dueDate, isComplete }
    dispatcher.dispatch(NEW_TASK, newTask)
  }

  return (
    <StyledContainer>
      <Container>
        <StyledTypography variant='h3'>
          Create New Task
        </StyledTypography>
      </Container>
      
      <StyledContainer>
        <StyledBox component='form' onSubmit={e => dispatchNewTask(e)}>
          <StyledContainer id='inputs'>
            <TextField required name='taskName' id='standard-required' label='Name' onChange={(e) => setTaskName(e.target.value)} />
            <TextField required name='dueDate' id='standard-required' label='Due Date' onChange={(e) => setDueDate(e.target.value)} />
            <FormControlLabel control={<Checkbox onClick={()=> setIsComplete(!isComplete)} />} label='is it completed already?' />
          </StyledContainer>
          <StyledContainer>
            <Button variant='contained' type='submit' color='primary'>Create Task</Button>
          </StyledContainer>
        </StyledBox>
      </StyledContainer>
    </StyledContainer>
  )
}
