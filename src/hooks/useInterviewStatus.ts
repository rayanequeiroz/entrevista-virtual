import { useState, useCallback } from "react";
import { InterviewStatus } from "../types/interview";

export const useInterviewStatus = () => {
  const [status, setStatus] = useState<InterviewStatus>("not-started");

  const startInterview = useCallback(() => setStatus("in-progress"), []);
  const pauseInterview = useCallback(() => setStatus("paused"), []);
  const resumeInterview = useCallback(() => setStatus("in-progress"), []);
  const endInterview = useCallback(() => setStatus("completed"), []);

  return {
    status,
    startInterview,
    pauseInterview,
    resumeInterview,
    endInterview,
  };
};
