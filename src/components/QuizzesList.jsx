import React from 'react'
import { useQuizzes } from '../hooks/quiz'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import QuizIcon from '@mui/icons-material/Quiz';
import EditIcon from '@mui/icons-material/Edit';

const QuizzesList = ({ handleEditQuiz }) => {
  const { quizzes, handleDeleteQuiz } = useQuizzes();
  return (
    <>
        <Typography  variant="h6" component="div">
          Quizzes:
        </Typography>
        <List dense={false}>
          {
            quizzes.length > 0 ? (
              quizzes.map((quiz) => (

                <ListItem
                  key={quiz.id}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleEditQuiz(quiz)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteQuiz(quiz.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <QuizIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={quiz.title}
                    secondary={quiz.description}
                  />
                </ListItem>
              ))) : <p>No quizzes available</p>

          }

        </List>
    </>
  )
}

export default QuizzesList