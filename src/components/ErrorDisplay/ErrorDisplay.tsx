import { useError } from '../../contexts/ErrorContext';
import { Alert } from 'antd';

export const ErrorDisplay = () => {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <Alert
      description={error}
      type="error"
      showIcon
      closable
      onClose={clearError}
    />
  );
};
