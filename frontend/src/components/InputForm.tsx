import { useState, useContext } from 'react'
import { WORK_ON_PROGRESS } from '../constants'
import { client } from '../libs/axios'
import { TodoContext } from '../provider/TodoProvider'
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export const InputForm = () => {
  const [todoName, setTodoName] = useState('')
  const { setTodos } = useContext(TodoContext)
  const onChangeTodoName: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTodoName(event.target.value)
  }

  const addTodo = async () => {
    const body = {
      name: todoName,
      status: WORK_ON_PROGRESS,
    }
    await client.post('todo/add-todo', body)
    client.get('todo/fetch-todos').then(({ data }) => {
      setTodos(data)
    })
  }

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        添加新任务
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          placeholder="学习Golang"
          variant="outlined"
          size="small"
          onChange={onChangeTodoName}
          sx={{ mr: 2, flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo}
          sx={{ height: '40px' }}
        >
          追加
        </Button>
      </Box>
    </Paper>
  )
}
