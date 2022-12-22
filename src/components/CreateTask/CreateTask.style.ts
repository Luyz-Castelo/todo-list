import { styled, css, Box, Container, Typography, TextField } from "@mui/material"

export const StyledBox = styled(Box)`
  background-color: #222222;
  padding: 3vmin;
  border-radius: 2rem;
`

export const StyledContainer = styled(Container)`
  padding: 0 !important;

  ${props => props.id === 'inputs' && css`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2vh;
  `}
`

export const StyledTextField = styled(TextField)`
  margin-right: 2vw;
`

export const StyledTypography = styled(Typography)`
  margin-bottom: 2vh
`
