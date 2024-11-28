import { Button, Space } from "antd";
import {
  AudioOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { useInterview } from "../../contexts/InterviewContext";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";

import styled from "styled-components";

const HiddenAudio = styled.audio`
  display: none;
`;

export const AudioRecorder = () => {
  const { recording } = useInterview();
  const {
    startRecording,
    stopRecording,
    playRecording,
    stopPlayback,
    isRecording,
    isPlaying,
    audioPlayerRef,
    deleteRecording,
  } = useAudioRecorder();

  return (
    <div>
      <Space>
        {!isRecording ? (
          <Button
            type="primary"
            icon={<AudioOutlined />}
            onClick={startRecording}
          >
            Iniciar Gravação
          </Button>
        ) : (
          <Button
            type="default"
            icon={<PauseOutlined />}
            onClick={stopRecording}
          >
            Parar Gravação
          </Button>
        )}

        {recording && (
          <>
            <Button
              icon={<PlayCircleOutlined />}
              onClick={() => playRecording(recording)}
              disabled={isPlaying}
            >
              Reproduzir
            </Button>
            <Button icon={<DeleteOutlined />} onClick={deleteRecording}>
              Excluir
            </Button>
          </>
        )}
      </Space>

      <HiddenAudio ref={audioPlayerRef} onEnded={stopPlayback} />
    </div>
  );
};
