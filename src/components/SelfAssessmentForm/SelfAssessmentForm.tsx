import { useState } from "react";
import {
  Card,
  Typography,
  Rate,
  Input,
  Button,
  Space,
  notification,
} from "antd";
import { SelfAssessment } from "../../types/interview";
import { submitSelfAssessment } from "../../services/interviewService";
import styled from "styled-components";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const CenteredSpace = styled(Space)`
  width: 100%;
  text-align: center;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 500px;
`;

const openNotification = () => {
  notification.success({
    message: "Autoavaliação Enviada",
    description: "Sua autoavaliação foi enviada com sucesso. Obrigado!",
  });
};

export const SelfAssessmentForm = () => {
  const [selfAssessment, setSelfAssessment] = useState<SelfAssessment>({
    confidence: 0,
    clearness: 0,
    technicalDepth: 0,
    reflections: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSelfAssessmentSubmit = () => {
    const result = submitSelfAssessment(selfAssessment);
    if (result) {
      setSubmitted(true);
      openNotification();
    }
  };

  if (submitted) {
    return (
      <CenteredSpace direction="vertical" align="center">
        <Typography.Title level={3}>Entrevista Concluída</Typography.Title>
        <Paragraph>
          Obrigado por participar! Nosso time irá avaliar suas respostas e em
          breve retornamos.
        </Paragraph>
      </CenteredSpace>
    );
  }

  return (
    <StyledCard title="Autoavaliação de Desempenho">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Space direction="vertical" size="small">
            <Text strong>
              Como você se sentiu em relação às suas respostas?
            </Text>
            <Rate
              value={selfAssessment.confidence}
              onChange={(value) =>
                setSelfAssessment((prev) => ({
                  ...prev,
                  confidence: value,
                }))
              }
            />
          </Space>
        </div>

        <div>
          <Space direction="vertical" size="small">
            <Text strong>Clareza das suas explicações</Text>
            <Rate
              value={selfAssessment.clearness}
              onChange={(value) =>
                setSelfAssessment((prev) => ({
                  ...prev,
                  clearness: value,
                }))
              }
            />
          </Space>
        </div>

        <div>
          <Space direction="vertical" size="small">
            <Text strong>Profundidade técnica das respostas</Text>
            <Rate
              value={selfAssessment.technicalDepth}
              onChange={(value) =>
                setSelfAssessment((prev) => ({
                  ...prev,
                  technicalDepth: value,
                }))
              }
            />
          </Space>
        </div>

        <div>
          <Text strong>Reflexões finais</Text>
          <TextArea
            rows={4}
            placeholder="Compartilhe seus pensamentos sobre a entrevista..."
            value={selfAssessment.reflections}
            onChange={(e) =>
              setSelfAssessment((prev) => ({
                ...prev,
                reflections: e.target.value,
              }))
            }
          />
        </div>

        <Button
          type="primary"
          block
          onClick={handleSelfAssessmentSubmit}
          disabled={
            selfAssessment.confidence === 0 ||
            selfAssessment.clearness === 0 ||
            selfAssessment.technicalDepth === 0
          }
        >
          Enviar Autoavaliação
        </Button>
      </Space>
    </StyledCard>
  );
};
