import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './App.theme';
import { CreateTask } from './components/CreateTask/CreateTask';
import { TaskList } from './components/TaskList/TaskList';
import { StyledContainer } from './App.style';

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <StyledContainer maxWidth='md'>
        <CssBaseline />
        <CreateTask />
        <TaskList />
      </StyledContainer>
    </ThemeProvider>
  );
}
