import type { ReactNode } from 'react';
import Button from './Button/Button.jsx';

// Types for step configurations
export type Step = {
  id: string;
  label: string;
  completed?: boolean;
  data?: any;
};

export type StepIndicatorStyles = {
  container?: string;
  progressBar?: string;
  stepDot?: string;
  activeDot?: string;
  completedDot?: string;
  pendingDot?: string;
  stepLabel?: string;
  currentStepLabel?: string;
  backButton?: string;
  progressContainer?: string;
  cursor?: string;
  remainingCount?: string;
};

export type StepsIndicatorProps = {
  steps: Step[];
  currentStep: number;
  maxVisibleSteps?: number;
  showLabels?: boolean;
  showBackButton?: boolean;
  backIcon?: string | ReactNode;
  onStepChange?: (step: number) => void;
  onBackPress?: () => void;
  allowStepClick?: boolean;
  hideRemainingCount?: boolean;
  stepColors?: Record<string, string>;
  showCursor?: boolean;
  activeColor?: string;
  styles?: StepIndicatorStyles;
};

const defaultStyles: StepIndicatorStyles = {
  container: 'flex  flex-row items-center justify-center w-[350px]',
  progressBar: 'flex flex-row gap-1 items-center h-full w-full overflow-hidden',
  stepDot: 'w-[6px] h-[12px] rounded-full opacity-80',
  activeDot: 'opacity-100',
  completedDot: 'opacity-80',
  pendingDot: 'opacity-50',
  stepLabel: 'text-sm text-[#323842]',
  currentStepLabel: 'text-sm font-bold text-[#323842]',
  backButton: 'absolute left-0 w-[20px] h-[20px]',
  progressContainer: ' w-[270px] ml-10 h-full',
  cursor: 'w-[10px] h-[10px] left-[-2.5px] top-[22px] absolute',
  remainingCount: 'text-sm text-[#ed7d2d]',
};

export default function StepsIndicator({
  steps,
  currentStep,
  maxVisibleSteps = 30,
  showLabels = false,
  showBackButton = false,
  backIcon,
  onStepChange,
  onBackPress,
  allowStepClick = false,
  hideRemainingCount = false,
  stepColors,
  showCursor = true,
  activeColor = '#ed7d2d',
  styles = {},
}: StepsIndicatorProps) {
  // Merge default styles with custom styles
  const mergedStyles = { ...defaultStyles, ...styles };

  // Calculate the total and remaining steps
  const totalSteps = steps.length;
  const remainingSteps = Math.max(0, totalSteps - maxVisibleSteps);
  const visibleSteps = steps.slice(0, maxVisibleSteps);

  // Handle step click
  const handleStepClick = (index: number) => {
    if (allowStepClick && onStepChange) {
      onStepChange(index);
    }
  };

  // Handle back button click
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (onStepChange && currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  // Get color for a specific step
  const getStepColor = (step: Step, index: number) => {
    if (stepColors && step.id in stepColors) {
      return stepColors[step.id];
    }

    // Default colors based on completion and current step
    if (index === currentStep) {
      return activeColor;
    }
    return step.completed ? activeColor : '#dee1e6';
  };

  return (
    <>
      <view className={mergedStyles.container}>
        {showBackButton && (
          <view className={mergedStyles.backButton} bindtap={handleBackPress}>
            {typeof backIcon === 'string' ? (
              <image src={backIcon} className="w-full h-full" />
            ) : (
              backIcon
            )}
          </view>
        )}

        <view className={mergedStyles.progressContainer}>
          {showCursor && (
            <image className={mergedStyles.cursor} src="/cursor.png" />
          )}

          <view
            className={`${mergedStyles.progressBar} ${
              remainingSteps > 0 ? 'border-r-[4px] border-[#ed7d2d]' : ''
            }`}
          >
            {visibleSteps.map((step, index) => (
              <view
                key={step.id}
                className={`${mergedStyles.stepDot} ${
                  index === currentStep
                    ? mergedStyles.activeDot
                    : step.completed
                      ? mergedStyles.completedDot
                      : mergedStyles.pendingDot
                }`}
                style={{
                  backgroundColor: getStepColor(step, index),
                }}
                bindtap={() => handleStepClick(index)}
              />
            ))}
          </view>
        </view>

        {!hideRemainingCount && remainingSteps > 0 && (
          <text className={mergedStyles.remainingCount}>
            {' '}
            +{remainingSteps}
          </text>
        )}
      </view>
      {showLabels && (
        <text className={'text-2xl w-[350px] h-[50px] my-10'}>
          {visibleSteps[currentStep]?.label}
        </text>
      )}
    </>
  );
}
