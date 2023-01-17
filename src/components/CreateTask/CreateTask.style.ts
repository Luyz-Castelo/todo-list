import { styled, css, Box, Container, Typography, TextField } from "@mui/material"
import { devices } from "../../constants/style-breakpoints"

export const StyledBox = styled(Box)`
  background-color: #222222;
  padding: 3vmax;
  border-radius: 2rem;

  @media ${devices.mobile} {
    border-radius: 0;
  }
`

export const StyledContainer = styled(Container)`
  padding: 0 !important;

  ${props => props.id === 'inputs' && css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2vh;
  `}

  @media ${devices.mobile} {
    padding: 0;
  }
`

export const StyledTypography = styled(Typography)`
  margin-bottom: 2vh;

  font-size: 3rem;
  line-height: 1.167;
  letter-spacing: 0em;

  @media ${devices.mobile} {
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
  }
`
