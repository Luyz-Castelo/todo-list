import { Typography } from '@mui/material';
import { styled, Container, TableCell } from '@mui/material';
import { devices } from '../../constants/style-breakpoints';

export const StyledContainer = styled(Container)`
  background-color: #222222;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 1rem;

  @media ${devices.mobile} {
    padding: 0
  }
`

export const StyledTableCell = styled(TableCell)`
  svg {
    cursor: pointer;
  }
`

export const StyledTypography = styled(Typography)`
  font-size: 2.125rem;
  line-height: 1.235;
  letter-spacing: 0.00735em;

  @media ${devices.mobile} {
    font-size: 1.5rem;
    line-height: 1.334;
    letter-spacing: 0em;
    padding: 1rem;
  }
`
