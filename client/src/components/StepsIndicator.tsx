import type { ReactNode } from 'react';
import Button from './Button/Button.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

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
  container: 'flex min-h-[20px] flex-row items-center justify-center w-[350px]',
  progressBar:
    'flex px-2 flex-row gap-1 items-center h-full w-[210px] overflow-x-hidden flex-nowrap',
  stepDot: 'w-[9px] h-[16px] rounded-full opacity-80 flex-shrink-0',
  activeDot: 'opacity-100 scale-125 ',
  completedDot: 'opacity-80',
  pendingDot: 'opacity-50',
  stepLabel: 'text-sm',
  currentStepLabel: 'text-sm font-bold',
  backButton: 'absolute left-0 w-[20px] h-[20px]',
  progressContainer:
    'flex flex-row justify-center items-center w-[260px] h-full rounded-full py-2 px-4',
  cursor: 'w-[10px] h-[10px] left-[-2.5px] top-[22px] absolute',
  remainingCount:
    'border-l-4 border-[#ed7d2d] w-[25px] h-[20px] flex items-center justify-center',
};

export default function StepsIndicator({
  steps,
  currentStep,
  maxVisibleSteps = 16,
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
  const { theme } = useTheme();
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
      onStepChange(currentStep);
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

        <view
          className={`${mergedStyles.progressContainer} ${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-[#f9f9fa]'}`}
        >
          {showCursor && (
            <image className={mergedStyles.cursor} src="/cursor.png" />
          )}

          <view className={`${mergedStyles.progressBar} `}>
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
          {remainingSteps > 0 && (
            <view className={mergedStyles.remainingCount}>
              <text className="flex items-center justify-center text-[#ed7d2d] text-xs font-bold">
                +{totalSteps}
              </text>
            </view>
          )}
        </view>
      </view>
      {showLabels && (
        <text
          className={`${mergedStyles.currentStepLabel} ${theme === 'dark' ? 'text-white' : 'text-[#323842]'}`}
        >
          {visibleSteps[currentStep]?.label}
        </text>
      )}
    </>
  );
}
