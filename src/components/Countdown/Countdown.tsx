import { useState, useEffect, useCallback } from "react";
import { Progress } from "antd";
import { useInterview } from "../../contexts/InterviewContext";
import { DEFAULT_INTERVIEW_TIME } from "../../constants/time";
import { formatTime } from "../../utils/formatters";

export const Countdown = () => {
  const { status, currentQuestionIndex, nextQuestion, clearRecording } =
    useInterview();
  const [timeLeft, setTimeLeft] = useState(DEFAULT_INTERVIEW_TIME);

  useEffect(() => {
    setTimeLeft(DEFAULT_INTERVIEW_TIME);
    clearRecording();
  }, [currentQuestionIndex, clearRecording]);

  const handleTimeUp = useCallback(() => {
    clearRecording();
    nextQuestion();
  }, [clearRecording, nextQuestion]);

  useEffect(() => {
    if (status !== "in-progress") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, currentQuestionIndex, handleTimeUp]);

  const percent =
    ((DEFAULT_INTERVIEW_TIME - timeLeft) / DEFAULT_INTERVIEW_TIME) * 100;

  return (
    <div>
      <Progress
        percent={percent}
        format={() => formatTime(timeLeft)}
        status={timeLeft < 60 ? "exception" : "active"}
      />
    </div>
  );
};
