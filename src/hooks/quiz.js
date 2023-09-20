import { useEffect, useState } from "react";

export const useQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);

    const fetchQuizzes = async () => {
        try {
            const response = await fetch('http://localhost:5000/quizzes');
            const data = await response.json();
            setQuizzes(data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };
    const handleDeleteQuiz =async (quizId) => {
        try {
            await fetch(`http://localhost:5000/quizzes/${quizId}`, {
                method: 'DELETE',
            });
            setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return { quizzes, setQuizzes, handleDeleteQuiz };
};