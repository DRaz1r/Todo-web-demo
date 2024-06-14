import { InputForm } from '../components/InputForm'
import { TodoList } from '../components/TodoList'
import { Container, Box, CssBaseline, Paper } from '@mui/material';

export const Dashboard = () => {
  return (
    <Container maxWidth="sm" sx={{ my: 5 }}>
      <CssBaseline />
      <Box sx={{ mb: 5 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <InputForm />
        </Paper>
      </Box>
      <Paper elevation={3} sx={{ p: 3 }}>
        <TodoList />
      </Paper>
    </Container>
  )
}
