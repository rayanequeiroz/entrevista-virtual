import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInterview } from "../contexts/InterviewContext";
import { AudioRecording } from "../types/interview";
import { useError } from "../contexts/ErrorContext";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const { setError } = useError();
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const { addRecording, clearRecording } = useInterview();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioURL = URL.createObjectURL(audioBlob);

        const recording: AudioRecording = {
          id: uuidv4(),
          blob: audioBlob,
          audioURL: audioURL,
          duration: 0,
          timestamp: Date.now(),
        };

        addRecording(recording);
        setIsRecording(false);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      setError(
        "Erro ao iniciar gravação. Verifique se seu microfone está habilitado"
      );
      console.error("Erro ao iniciar gravação", error);
    }
  }, [addRecording, setError]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  const playRecording = useCallback((recording: AudioRecording) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = recording.audioURL || "";
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const stopPlayback = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const deleteRecording = useCallback(() => {
    clearRecording();
  }, [clearRecording]);

  return {
    startRecording,
    stopRecording,
    playRecording,
    stopPlayback,
    deleteRecording,
    isRecording,
    isPlaying,
    audioPlayerRef,
  };
}
