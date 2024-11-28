import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { 
  InterviewContextType, 
  InterviewProviderProps, 
  AudioRecording 
} from '../types/interview';
import { DEFAULT_INTERVIEW_TIME } from '../constants/time';
import { useInterviewStatus } from '../hooks/useInterviewStatus';
import { useQuestionManager } from '../hooks/useQuestionManager';

export const InterviewContext = createContext<InterviewContextType>({
  status: 'not-started',
  currentQuestion: null,
  timeRemaining: DEFAULT_INTERVIEW_TIME,
  currentQuestionIndex: 0,
  totalQuestions: 0,
  recording: null,
  startInterview: () => {},
  pauseInterview: () => {},
  resumeInterview: () => {},
  endInterview: () => {},
  nextQuestion: () => {},
  addRecording: () => {},
  clearRecording: () => {},
});

export const InterviewProvider = ({ children }: InterviewProviderProps) => {
  const { status, startInterview, pauseInterview, resumeInterview, endInterview } = useInterviewStatus();
  const { currentQuestion, currentQuestionIndex, totalQuestions, nextQuestion } = useQuestionManager();

  const [recording, setRecording] = useState<AudioRecording | null>(null);

  const addRecording = useCallback((newRecording: AudioRecording) => {
    setRecording(newRecording);
  }, []);

  const clearRecording = useCallback(() => {
    setRecording(null);
  }, []);

  const value = useMemo(() => ({
    status,
    currentQuestion,
    timeRemaining: DEFAULT_INTERVIEW_TIME,
    currentQuestionIndex,
    totalQuestions,
    startInterview,
    pauseInterview,
    resumeInterview,
    endInterview,
    nextQuestion,
    recording,
    addRecording,
    clearRecording,
  }), [
    status, 
    currentQuestion, 
    currentQuestionIndex, 
    totalQuestions, 
    startInterview, 
    pauseInterview, 
    resumeInterview, 
    endInterview, 
    nextQuestion, 
    recording, 
    addRecording, 
    clearRecording,
  ]);

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) throw new Error('useInterview must be used within an InterviewProvider');
  return context;
};
