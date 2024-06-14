import { useEffect, useContext } from 'react'
import { client } from '../libs/axios'
import { TodoContext } from '../provider/TodoProvider'
import { TodoType } from '../types';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const omitText = (text: string): string => {
  if (text.length > 10) {
    return text.substring(0, 7) + '...'
  }
  return text
}

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodoContext)

  useEffect(() => {
    client.get('todo/fetch-todos').then(({ data }) => {
      setTodos(data)
    })
  }, [])

  const changeTodo = async (id: string, status: string) => {
    await client.post('todo/change-todo', { id, status })
    client.get('todo/fetch-todos').then(({ data }) => {
      setTodos(data)
    })
  }

  const deleteTodo = async (id: string) => {
    await client.post('todo/delete-todo', { id })
    client.get('todo/fetch-todos').then(({ data }) => {
      setTodos(data)
    })
  }

  return (
    // 用于布局组件，相当于一个 div
    <Box sx={{ p: 4 }} justifyContent="center">
      <Typography variant="h4" gutterBottom>
        任务列表
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>序号</TableCell>
              <TableCell>任务名</TableCell>
              <TableCell>状态</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo: TodoType, index: number) => (
              <TableRow key={todo.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{omitText(todo.name)}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => changeTodo(todo.id, todo.status)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
