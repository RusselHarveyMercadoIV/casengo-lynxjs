import { useState, useMemo, useEffect } from 'react';
import Button from '../components/Button/Button.jsx';
import Separator from '../components/Separator.jsx';
import StepsIndicator, { type Step } from '../components/StepsIndicator.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

import icons from '../constants/icons.js';
import type {
  AcademicStatus,
  adNoticeType,
  profilingDataType,
  academicStatusesType,
  comittmentsType,
} from '../types/types.js';
import { useNavigate } from 'react-router';
import { DIAGNOSTIC_QUESTIONS } from '../constants/question-bank.js';
import { headers } from '../constants/start.js';

const profilingData: profilingDataType = {
  countryExam: '',
  appNotice: '',
  academicStatus: '',
  goal: '',
  comittment: '',
  start: '',
};

// Common styles
const STYLES = {
  container: 'container  flex-col items-center  h-full',
  contentWrapper: 'relative w-full h-[500px] mb-14 overflow-hidden',
  contentContainer:
    'flex-col flex gap-14 justify-start items-center absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out',
  buttonBase: 'flex-row gap-5 py-4 px-8 justify-start items-center w-[350px]',
  buttonLarge: 'flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]',
  buttonCommon: 'min-w-[350px] min-h-[60px]',
  disabled: 'opacity-40',
  iconSmall: 'w-8 h-8',
  iconLarge: 'w-10 h-10 rounded-2xl',
  comingSoon: 'flex flex-col justify-center items-center gap-10 w-[350px]',
  comingSoonText: 'text-2xl',
  buttonList: 'flex flex-col gap-6',
  slideLeft: 'transform -translate-x-full opacity-0',
  slideRight: 'transform translate-x-full opacity-0',
  slideIn: 'transform translate-x-0 opacity-100',
} as const;

// Constants
const GOALS = [
  'Build foundational knowledge',
  'Strengthen clinical skills',
  'Prepare for PNLE',
] as const;

const PNLE_ELIGIBLE_STATUSES = ['Recent Graduate', 'Senior'] as const;

const COMMITMENTS: comittmentsType = {
  '3 min / day': 'Casual',
  '10 min / day': 'Regular',
  '15 min / day': 'Serious',
  '30 min / day': 'Intense',
};

export default function Profiling() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<profilingDataType>(profilingData);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [previousStep, setPreviousStep] = useState<number>(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [animating, setAnimating] = useState<boolean>(false);
  const navigation = useNavigate();

  const handleDataChange = (
    type: keyof profilingDataType,
    value: profilingDataType[keyof profilingDataType],
  ) => {
    if (type === 'academicStatus') {
      const isDisabled = !(
        PNLE_ELIGIBLE_STATUSES.includes(
          value as (typeof PNLE_ELIGIBLE_STATUSES)[number],
        ) && formData.goal === 'Prepare for PNLE'
      );
      if (isDisabled) {
        setFormData((prevData) => ({ ...prevData, goal: '' }));
      }
    }
    setFormData((prevData) => ({ ...prevData, [type]: value }));
  };

  const handleStepChange = (step: number) => {
    if (animating) return;

    setDirection(step > 0 ? 'forward' : 'backward');
    setAnimating(true);
    setPreviousStep(currentStep);

    setTimeout(() => {
      if (currentStep === 5 && step > 0) {
        navigation('/quiz', {
          state: {
            questions: DIAGNOSTIC_QUESTIONS,
            academicStatus: formData?.academicStatus as AcademicStatus,
            type: 'diagnostic',
          },
        });
      } else {
        if (currentStep === 0 && step < 0) {
          navigation('/');
        } else {
          setCurrentStep((prevStep) => prevStep + step);
        }
      }
      setAnimating(false);
    }, 150);
  };

  const renderCountryExamStep = useMemo(
    () => (
      <>
        <Button
          key={'p1-1'}
          variant="plain"
          className={`${STYLES.buttonBase} ${
            theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}
          text="PNLE"
          isHighlighted={formData.countryExam === 'PNLE'}
          icon={<image src={icons.philippines} className={STYLES.iconLarge} />}
          onTap={
            formData.countryExam === 'PNLE'
              ? () => handleDataChange('countryExam', '')
              : () => handleDataChange('countryExam', 'PNLE')
          }
        />

        <Separator className="mt-16 mb-12" />
        <view className={STYLES.comingSoon}>
          <text
            className={`${STYLES.comingSoonText} ${theme === 'dark' ? 'text-gray-400' : 'text-[#9095a0]'}`}
          >
            Coming soon...
          </text>
          <view className="flex flex-col gap-5">
            <Button
              key={'p1-2'}
              className={`${STYLES.buttonBase} ${STYLES.disabled} ${
                theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
              }`}
              variant="plain"
              icon={<image src={icons.america} className={STYLES.iconLarge} />}
              disabled={true}
              text="NCLEX - RN"
              isHighlighted={formData.countryExam === 'NCLEX-RN'}
              onTap={
                formData.countryExam === 'NCLEX-RN'
                  ? () => handleDataChange('countryExam', '')
                  : () => handleDataChange('countryExam', 'NCLEX-RN')
              }
            />

            <Button
              key={'p1-3'}
              className={`${STYLES.buttonBase} ${STYLES.disabled} ${
                theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
              }`}
              disabled={true}
              text="NCLEX - PN"
              variant="plain"
              icon={<image src={icons.america} className={STYLES.iconLarge} />}
              isHighlighted={formData.countryExam === 'NCLEX-PN'}
              onTap={
                formData.countryExam === 'NCLEX-PN'
                  ? () => handleDataChange('countryExam', '')
                  : () => handleDataChange('countryExam', 'NCLEX-PN')
              }
            />
          </view>
        </view>
      </>
    ),
    [formData.countryExam, theme],
  );

  const renderAdNoticeStep = useMemo(() => {
    const adNotice: adNoticeType = {
      'Google Search': icons.google,
      Facebook: icons.facebook,
      Youtube: icons.youtube,
      'Friends/family': icons.people,
      Others: icons.more,
    };

    return (
      <view className={STYLES.buttonList}>
        {(Object.keys(adNotice) as Array<keyof adNoticeType>).map(
          (choice: keyof adNoticeType) => (
            <Button
              key={choice}
              className={`${STYLES.buttonBase} ${
                theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
              }`}
              text={choice}
              variant="plain"
              isHighlighted={formData.appNotice === choice}
              icon={
                <image src={adNotice[choice]} className={STYLES.iconSmall} />
              }
              onTap={
                formData.appNotice === choice
                  ? () => handleDataChange('appNotice', '')
                  : () => handleDataChange('appNotice', choice)
              }
            />
          ),
        )}
      </view>
    );
  }, [formData.appNotice]);

  const renderAcademicStatusStep = useMemo(() => {
    const academicStatuses: academicStatusesType = {
      Freshman: icons.syringe,
      Sophomore: icons.nursecap,
      Junior: icons.stethoscope,
      Senior: icons.nurse,
      'Recent Graduate': icons.note,
    };

    return (
      <view className={STYLES.buttonList}>
        {(
          Object.keys(academicStatuses) as Array<keyof academicStatusesType>
        ).map((choice: keyof academicStatusesType) => (
          <Button
            key={choice}
            className={`${STYLES.buttonBase} ${
              theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
            }`}
            text={choice}
            variant="plain"
            isHighlighted={formData.academicStatus === choice}
            icon={
              <image
                src={academicStatuses[choice]}
                className={STYLES.iconSmall}
              />
            }
            onTap={
              formData.academicStatus === choice
                ? () => handleDataChange('academicStatus', '')
                : () => handleDataChange('academicStatus', choice)
            }
          />
        ))}
      </view>
    );
  }, [formData.academicStatus]);

  const renderGoalStep = useMemo(
    () => (
      <view className={STYLES.buttonList}>
        {GOALS.map((goal) => {
          const isDisabled =
            !PNLE_ELIGIBLE_STATUSES.includes(
              formData.academicStatus as (typeof PNLE_ELIGIBLE_STATUSES)[number],
            ) && goal === 'Prepare for PNLE';

          return (
            <Button
              key={goal}
              className={
                STYLES.buttonLarge +
                ` ${isDisabled && STYLES.disabled} ${
                  theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
                }`
              }
              text={goal}
              variant="plain"
              isHighlighted={formData.goal === goal && !isDisabled}
              disabled={isDisabled}
              onTap={
                formData?.goal === goal
                  ? () => handleDataChange('goal', '')
                  : () => handleDataChange('goal', goal)
              }
            />
          );
        })}
      </view>
    ),
    [formData.academicStatus, formData.goal],
  );

  const renderCommitmentStep = useMemo(
    () => (
      <view className={STYLES.buttonList}>
        {(Object.keys(COMMITMENTS) as Array<keyof comittmentsType>).map(
          (comittment: keyof comittmentsType) => (
            <Button
              key={comittment}
              className={`${STYLES.buttonLarge} ${
                theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
              } justify-between`}
              text={comittment}
              secondText={COMMITMENTS[comittment]}
              variant="plain"
              isHighlighted={formData.comittment === comittment}
              onTap={
                formData.comittment === comittment
                  ? () => handleDataChange('comittment', '')
                  : () => handleDataChange('comittment', comittment)
              }
            />
          ),
        )}
      </view>
    ),
    [formData.comittment],
  );

  const renderStartStep = useMemo(
    () => (
      <view className={STYLES.buttonList}>
        <Button
          key={'p6-1'}
          className={`${STYLES.buttonLarge} ${
            theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}
          text="Take the Assessment"
          sup="RECOMMENDED"
          sub="Let's make a personalized learning for you!"
          variant="plain"
          isHighlighted={formData.start === 'personalized'}
          onTap={
            formData.start === 'personalized'
              ? () => handleDataChange('start', '')
              : () => handleDataChange('start', 'personalized')
          }
        />
        <Button
          key={'p6-2'}
          className={`${STYLES.buttonLarge} ${
            theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}
          text="Start from scratch!"
          sub="Good for people starting out."
          variant="plain"
          isHighlighted={formData.start === 'scratch'}
          onTap={
            formData.start === 'scratch'
              ? () => handleDataChange('start', '')
              : () => handleDataChange('start', 'scratch')
          }
        />
      </view>
    ),
    [formData.start],
  );

  const renderStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 0:
        return renderCountryExamStep;
      case 1:
        return renderAdNoticeStep;
      case 2:
        return renderAcademicStatusStep;
      case 3:
        return renderGoalStep;
      case 4:
        return renderCommitmentStep;
      case 5:
        return renderStartStep;
      default:
        return null;
    }
  };

  const getInitialPositionClass = (stepNumber: number) => {
    if (stepNumber === currentStep) {
      return direction === 'forward' ? STYLES.slideRight : STYLES.slideLeft;
    }
    return STYLES.slideIn;
  };

  const getFinalPositionClass = (stepNumber: number) => {
    if (stepNumber === previousStep) {
      return direction === 'forward' ? STYLES.slideLeft : STYLES.slideRight;
    }
    return STYLES.slideIn;
  };

  const steps = Object.keys(formData);
  const current = formData[steps[currentStep] as keyof profilingDataType];
  const isContinue = current === '';

  // Create steps array for StepsIndicator
  const profilingSteps = useMemo(() => {
    const stepKeys = Object.keys(formData) as Array<keyof profilingDataType>;

    return stepKeys.map((key, index) => ({
      id: key,
      label:
        headers[index]?.header || key.charAt(0).toUpperCase() + key.slice(1),
      completed: formData[key] !== '',
      data: formData[key],
    }));
  }, [formData]);

  return (
    <view
      className={`${STYLES.container} ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}
    >
      <view className="mt-6">
        <StepsIndicator
          steps={profilingSteps}
          currentStep={currentStep}
          showBackButton={true}
          backIcon={icons.leftArrow}
          onBackPress={() => handleStepChange(-1)}
          showLabels={Boolean(headers[currentStep]?.header)}
          activeColor="#ed7d2d"
          styles={{
            stepDot: 'w-6 h-6 rounded-full',
            progressBar: `flex flex-row justify-center items-center gap-4 ${
              theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-[#f8f9fa]'
            } w-[230px] h-[40px] rounded-full`,
            currentStepLabel: `text-2xl w-[350px] my-10 ${
              theme === 'dark' ? 'text-white' : 'text-[#323842]'
            }`,
          }}
        />
      </view>

      <view className={STYLES.contentWrapper}>
        {/* Exiting Content */}
        {animating && (
          <view
            className={`${STYLES.contentContainer} ${getFinalPositionClass(previousStep)}`}
          >
            {renderStep(previousStep)}
          </view>
        )}

        {/* Current Content */}
        <view
          className={`${STYLES.contentContainer} ${animating ? getInitialPositionClass(currentStep) : STYLES.slideIn}`}
        >
          {renderStep(currentStep)}
        </view>
      </view>

      <Button
        text="CONTINUE"
        variant="orange"
        bold={true}
        disabled={isContinue}
        onTap={() => handleStepChange(1)}
        className={`absolute bottom-0 mb-10 ${isContinue && STYLES.disabled} ${STYLES.buttonCommon} justify-center`}
      />
    </view>
  );
}
