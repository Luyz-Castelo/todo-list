import { Button, Container, TextField, FormControlLabel, Checkbox } from "@mui/material"
import { StyledBox, StyledContainer, StyledTextField, StyledTypography } from "./CreateTask.style"
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
    <Container>
      <StyledTypography variant='h3'>
        Create New Task
      </StyledTypography>
      
      <Container>
        <StyledBox component='form' onSubmit={e => dispatchNewTask(e)}>
          <StyledContainer id='inputs'>
            <StyledTextField required name='taskName' id='standard-required' label='Name' onChange={(e) => setTaskName(e.target.value)} />
            <StyledTextField required name='dueDate' id='standard-required' label='Due Date' onChange={(e) => setDueDate(e.target.value)} />
            <FormControlLabel control={<Checkbox onClick={()=> setIsComplete(!isComplete)} />} label='is it completed already?' />
          </StyledContainer>
          <StyledContainer>
            <Button variant='contained' type='submit' color='primary'>Create Task</Button>
          </StyledContainer>
        </StyledBox>
      </Container>
    </Container>
  )
}
