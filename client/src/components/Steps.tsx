import { useMemo } from 'react';
import Button from './Button/Button.jsx';
import type { profilingDataType } from '../types/types.js';

// Styles
const STYLES = {
  backButton: 'absolute top-6 left-6 border-none',
  container: 'flex flex-row items-center justify-center w-[350px]',
  stepsContainer:
    'flex flex-row justify-center items-center gap-4 bg-[#f8f9fa] w-[230px] h-[40px] rounded-full',
  stepDot: 'w-6 h-6 rounded-full',
  finishedStep: 'bg-[#ed7d2d]',
  unfinishedStep: 'bg-[#dee1e6]',
  header: 'text-2xl w-[350px] my-10',
  icon: 'w-6 h-6',
} as const;

// Step configuration
const STEPS = [
  { key: 'countryExam', label: 'Country' },
  { key: 'appNotice', label: 'Notice' },
  { key: 'academicStatus', label: 'Status' },
  { key: 'goal', label: 'Goal' },
  { key: 'comittment', label: 'Commitment' },
  { key: 'start', label: 'Start' },
] as const;

type StepsProps = {
  currentStep: number;
  icon?: string;
  onStepChange: () => void;
  formData: profilingDataType;
  header?: string;
};

export default function Steps({
  currentStep,
  icon,
  onStepChange,
  formData,
  header,
}: StepsProps) {
  const stepIndicators = useMemo(() => {
    return STEPS.map((step, index) => {
      const isCompleted = currentStep > index + 1 || formData[step.key] !== '';
      return (
        <view
          key={step.key}
          className={`${STYLES.stepDot} ${
            isCompleted ? STYLES.finishedStep : STYLES.unfinishedStep
          }`}
        />
      );
    });
  }, [currentStep, formData]);

  return (
    <>
      <Button
        variant="plain"
        icon={icon && <image src={icon} className={STYLES.icon} />}
        onTap={onStepChange}
        className={STYLES.backButton}
      />
      <view className={STYLES.container}>
        <view className={STYLES.stepsContainer}>{stepIndicators}</view>
      </view>
      {header && <text className={STYLES.header}>{header}</text>}
    </>
  );
}
