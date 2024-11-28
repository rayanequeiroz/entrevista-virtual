import { useState, useCallback } from "react";
import { MOCK_QUESTIONS } from "../constants/interview";

export const useQuestionManager = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < MOCK_QUESTIONS.length) {
      setCurrentQuestionIndex(nextIndex);
    }
  }, [currentQuestionIndex]);

  return {
    currentQuestion: MOCK_QUESTIONS[currentQuestionIndex] || null,
    currentQuestionIndex,
    totalQuestions: MOCK_QUESTIONS.length,
    nextQuestion,
  };
};
