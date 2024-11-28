import { useState } from "react";
import { Layout, Typography, Space, Card, Button, Col, Modal } from "antd";
import { useInterview } from "../../contexts/InterviewContext";
import { AudioRecorder } from "../../components/AudioRecorder/AudioRecorder";
import { Countdown } from "../../components/Countdown/Countdown";
import { SelfAssessmentForm } from "../../components/SelfAssessmentForm/SelfAssessmentForm";
import styled from "styled-components";
import { ErrorDisplay } from "../../components/ErrorDisplay/ErrorDisplay";
const { Title, Paragraph } = Typography;

const CenteredLayout = styled(Layout)`
  min-height: 100vh;
`;

const CenteredRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const CenteredContent = styled(Layout.Content)`
  max-width: 600px;
  margin: 0 auto;
`;

const CenteredCol = styled(Col)`
  text-align: center;
`;

const ResponsiveContainer = styled.div`
  @media (max-width: 580px) {
    margin: 15px;
  }
`;

const InterviewPage = () => {
  const {
    status,
    startInterview,
    currentQuestion,
    currentQuestionIndex,
    nextQuestion,
    totalQuestions,
    recording,
    endInterview,
  } = useInterview();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);

  const showInstructionsModal = () => {
    setIsInstructionsModalOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitConfirmation = () => {
    setIsModalOpen(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      nextQuestion();
    } else {
      endInterview();
    }
  };

  const handleInstructionsOk = () => {
    setIsInstructionsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (status) {
      case "not-started":
        return (
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Title level={2}> Bem-vindo à nossa entrevista virtual!</Title>
            <Title level={5}>
              Lembre-se de que esta é sua chance de brilhar!
            </Title>
            <Button type="primary" size="large" onClick={startInterview}>
              Iniciar Entrevista
            </Button>
            <Button type="default" size="large" onClick={showInstructionsModal}>
              Ver Instruções
            </Button>
          </Space>
        );

      case "in-progress":
        return (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Card>
              <Title level={4}>Pergunta {currentQuestionIndex + 1}</Title>
              <Paragraph>{currentQuestion?.text}</Paragraph>
            </Card>
            
            <Countdown />
            <AudioRecorder />

            <Space>
              {currentQuestionIndex < totalQuestions - 1 && (
                <Button
                  type="primary"
                  onClick={nextQuestion}
                  disabled={!recording}
                >
                  Próxima Pergunta
                </Button>
              )}
              {currentQuestionIndex === totalQuestions - 1 && (
                <Button
                  type="primary"
                  onClick={showModal}
                  disabled={!recording}
                >
                  Finalizar Gravações
                </Button>
              )}
            </Space>
          </Space>
        );

      case "completed":
        return <SelfAssessmentForm />;
    }
  };

  return (
    <ResponsiveContainer>
      <ErrorDisplay />
      <CenteredLayout>
        <CenteredRow>
          <CenteredCol span={24}>
            <CenteredContent>{renderContent()}</CenteredContent>
          </CenteredCol>
        </CenteredRow>

        <Modal
          title="Confirmar Envio"
          open={isModalOpen}
          onOk={handleSubmitConfirmation}
          onCancel={handleCancel}
          okText="Confirmar"
          cancelText="Cancelar"
        >
          <p>Você tem certeza que deseja enviar suas respostas?</p>
        </Modal>
        <Modal
          title="Instruções da Entrevista"
          open={isInstructionsModalOpen}
          onOk={handleInstructionsOk}
          onCancel={handleInstructionsOk}
          okText="Entendi"
          cancelText="Voltar"
        >
          <p>
            <strong>1. Preparação:</strong> Leia a pergunta que será exibida.
          </p>
          <p>
            <strong>2. Resposta:</strong> Grave sua resposta em áudio, clicando
            no botão de gravação.
          </p>
          <p>
            <strong>3. Duração:</strong> Você tem 5 minutos para responder à
            pergunta.
          </p>
          <p>
            <strong>4. Dúvidas:</strong> Caso precise de ajuda, entre em contato
            com o suporte.
          </p>
        </Modal>
      </CenteredLayout>
    </ResponsiveContainer>
  );
};

export default InterviewPage;
