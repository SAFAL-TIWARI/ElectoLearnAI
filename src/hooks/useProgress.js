import { useState, useEffect } from 'react';

export const useProgress = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('electo_progress');
    return saved ? JSON.parse(saved) : {
      completedSteps: [],
      quizScores: [],
      simulatorPath: null
    };
  });

  useEffect(() => {
    localStorage.setItem('electo_progress', JSON.stringify(progress));
  }, [progress]);

  const completeStep = (stepId) => {
    if (!progress.completedSteps.includes(stepId)) {
      setProgress(prev => ({
        ...prev,
        completedSteps: [...prev.completedSteps, stepId]
      }));
    }
  };

  const saveQuizScore = (score) => {
    setProgress(prev => ({
      ...prev,
      quizScores: [...prev.quizScores, { date: new Date().toISOString(), score }]
    }));
  };

  return { progress, completeStep, saveQuizScore };
};
