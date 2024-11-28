import { SelfAssessment } from '../types/interview';

export const submitSelfAssessment = (assessment: SelfAssessment): boolean => {
  try {
    localStorage.setItem('selfAssessment', JSON.stringify(assessment));
    return true;
  } catch (error) {
    console.error('Erro ao salvar autoavaliação', error);
    return false;
  }
};

export const getSelfAssessment = (): SelfAssessment | null => {
  const assessment = localStorage.getItem('selfAssessment');
  return assessment ? JSON.parse(assessment) : null;
};
