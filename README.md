
# Entrevista Virtual

Este projeto é uma aplicação de entrevista virtual desenvolvida com React, TypeScript, Ant Design e Styled Components. A aplicação é interativa e inclui funcionalidades como gravação de áudio, timer de contagem regressiva, sistema de avaliação pessoal e exibição de erros.

## 🌟 Visão Geral

A aplicação simula uma experiência de entrevista online, com funcionalidades como:

- **Gravação de Respostas**: Permite aos usuários gravarem respostas de áudio para perguntas específicas.
- **Timer de Contagem Regressiva**: Garante que as respostas sejam dadas dentro de um tempo limite.
- **Avaliação Pessoal**: Permite ao candidato avaliar seu desempenho ao final da entrevista.
- **Sistema de Erros**: Fornece feedback claro em caso de falhas, como problemas com permissões de microfone.

---

## 🛠 Funcionalidades

- **Perguntas de Entrevista**:
  - Perguntas categorizadas e com diferentes níveis de dificuldade.
  - Navegação entre perguntas.
  
- **Gravação de Áudio**:
  - Início e parada de gravações.
  - Reprodução e exclusão de gravações.
  
- **Timer de Contagem Regressiva**:
  - Visualização do tempo restante para cada resposta.
  - Mudança automática para a próxima pergunta ao término do tempo.

- **Autoavaliação**:
  - Classificação por confiança, clareza e profundidade técnica.
  - Campos para reflexões finais.

- **Interface de Erros**:
  - Alerta em caso de falhas, como ausência de permissões.

---

## 🗂 Estrutura do Projeto

```plaintext
src/
├── components/
│   ├── AudioRecorder/       # Componente para gravação de áudio
│   ├── Countdown/           # Timer com contagem regressiva
│   ├── ErrorDisplay/        # Exibição de mensagens de erro
│   └── SelfAssessmentForm/  # Formulário de autoavaliação
├── contexts/                # Context API para gerenciar estado global
├── hooks/                   # Hooks personalizados
├── constants/               # Constantes usadas no projeto
├── services/                # Serviços para integração com backend ou lógica externa
├── types/                   # Tipagens TypeScript
└── utils/                   # Funções utilitárias

```

## 🛠 Tecnologias Utilizadas

- **React:** Biblioteca principal para desenvolvimento da interface.
- **TypeScript:** Tipagem estática para maior segurança no código.
- **Ant Design:** Biblioteca de componentes UI.
- **Styled Components:** Estilização baseada em componentes.
- **UUID:** Geração de identificadores únicos.

## 🚀 Rodando o projeto

1. **Inicie o servidor de desenvolvimento:** Após clonar o projeto e instalar as dependências, execute o seguinte comando:
  
```
npm start
```

2. **Acesse a aplicação:** Abra o navegador e vá para http://localhost:3000.