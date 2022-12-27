import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './App.theme';
import { CreateTask } from './components/CreateTask/CreateTask';
import { TaskList } from './components/TaskList/TaskList';

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth='md' sx={{ padding: '2vmax'}}>
        <CssBaseline />
        <CreateTask />
        <TaskList />
      </Container>
    </ThemeProvider>
  );
}
