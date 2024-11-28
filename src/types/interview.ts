export type InterviewStatus =
  | "not-started"
  | "in-progress"
  | "paused"
  | "completed";

export interface Question {
  id: string;
  text: string;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface AudioRecording {
  id: string;
  blob: Blob;
  audioURL?: string;
  duration: number;
  timestamp: number;
}

export interface SelfAssessment {
  confidence: number;
  clearness: number;
  technicalDepth: number;
  reflections: string;
}

export interface InterviewProviderProps {
  children: React.ReactNode;
}

export interface InterviewContextType {
  status: InterviewStatus;
  currentQuestion: Question | null;
  timeRemaining: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  recording: AudioRecording | null;
  startInterview: () => void;
  pauseInterview: () => void;
  resumeInterview: () => void;
  endInterview: () => void;
  nextQuestion: () => void;
  addRecording: (recording: AudioRecording) => void;
  clearRecording: () => void;
}
