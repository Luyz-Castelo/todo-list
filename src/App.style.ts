import { styled, Container } from '@mui/material';
import { devices } from './constants/style-breakpoints';

export const StyledContainer = styled(Container)`
  padding: 2vmax;

  @media ${devices.mobile} {
    padding: 0 !important;
    padding-top: 1vh !important;
  }
`
