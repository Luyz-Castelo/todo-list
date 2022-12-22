import React, { useState } from 'react'
import { Button, Container, TextField } from "@mui/material"
import { StyledBox, StyledContainer, StyledTextField, StyledTypography } from "./CreateTask.style"

const createNewTask = (event: React.BaseSyntheticEvent) => {
  event.preventDefault();

  console.log(event.target)
}

export const CreateTask = () => {
  const [formData, setFormData] = useState({});
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value});
    console.log(event.target.name)
    console.log(event.target.value)
  }

  return (
    <Container>
      <StyledTypography variant='h3'>
        Create New Task
      </StyledTypography>
      
      <Container>
        <StyledBox component='form' onSubmit={event => createNewTask(event)}>
          <StyledContainer id='inputs'>
            <StyledTextField required name='task-name' id='standard-required' label='Name' onChange={handleChange} />
            <TextField required name='due-date' id='standard-required' label='Due Date' onChange={handleChange} />
          </StyledContainer>
          <StyledContainer>
            <Button variant='contained' type='submit'>Create Task</Button>
          </StyledContainer>
        </StyledBox>
      </Container>
    </Container>
  )
}
