import "antd/dist/reset.css";
import "./App.css";
import { ConfigProvider } from "antd";
import { InterviewProvider } from "./contexts/InterviewContext";
import InterviewPage from "./pages/InterviewPage/InterviewPage";
import { ErrorProvider } from "./contexts/ErrorContext";

function App() {
  return (
    <ConfigProvider>
      <ErrorProvider>
        <InterviewProvider>
          <InterviewPage />
        </InterviewProvider>
      </ErrorProvider>
    </ConfigProvider>
  );
}

export default App;
