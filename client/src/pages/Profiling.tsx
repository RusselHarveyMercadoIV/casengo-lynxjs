import { useState, useMemo } from 'react';
import Button from '../components/Button/Button.jsx';
import Separator from '../components/Separator.jsx';
import StepsIndicator, { type Step } from '../components/StepsIndicator.jsx';

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
  container: 'container mt-[25px] flex-col justify-start items-center h-full',
  contentContainer:
    'flex-col flex gap-14 mb-14 h-[500px] justify-start items-center',
  buttonBase: 'flex-row gap-5 py-4 px-8 justify-start items-center w-[350px]',
  buttonLarge: 'flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]',
  buttonCommon: 'min-w-[350px] min-h-[60px]',
  disabled: 'opacity-40',
  iconSmall: 'w-8 h-8',
  iconLarge: 'w-10 h-10 rounded-2xl',
  comingSoon: 'flex flex-col justify-center items-center gap-10 w-[350px]',
  comingSoonText: 'text-2xl text-[#9095a0]',
  buttonList: 'flex flex-col gap-6',
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
  const [formData, setFormData] = useState<profilingDataType>(profilingData);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigation = useNavigate();

  const handleDataChange = (
    type: keyof profilingDataType,
    value: profilingDataType[keyof profilingDataType],
  ) => {
    if (type === 'academicStatus') {
      const isDisabled =
        !PNLE_ELIGIBLE_STATUSES.includes(
          value as (typeof PNLE_ELIGIBLE_STATUSES)[number],
        ) && formData.goal === 'Prepare for PNLE';
      if (isDisabled) {
        setFormData((prevData) => ({ ...prevData, goal: '' }));
      }
    }
    setFormData((prevData) => ({ ...prevData, [type]: value }));
  };

  const handleStepChange = (step: number) => {
    if (currentStep === 5 && step > 0) {
      navigation('/quiz', {
        state: {
          questions: DIAGNOSTIC_QUESTIONS,
          academicStatus: formData?.academicStatus as AcademicStatus,
        },
      });
    } else {
      if (currentStep === 1 && step < 0) {
        navigation(-1);
      } else {
        setCurrentStep((prevStep) => prevStep + step);
      }
    }
  };

  const renderCountryExamStep = useMemo(
    () => (
      <>
        <Button
          key={'p1-1'}
          variant="plain"
          className={STYLES.buttonBase}
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
          <text className={STYLES.comingSoonText}>Coming soon...</text>
          <view className="flex flex-col gap-5">
            <Button
              key={'p1-2'}
              className={`${STYLES.buttonBase} ${STYLES.disabled}`}
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
              className={`${STYLES.buttonBase} ${STYLES.disabled}`}
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
    [formData.countryExam],
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
              className={STYLES.buttonBase}
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
            className={STYLES.buttonBase}
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
              className={STYLES.buttonLarge}
              text={goal}
              variant="plain"
              isHighlighted={formData.goal === goal && !isDisabled}
              disabled={isDisabled}
              onTap={
                formData.goal === goal
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
              className={STYLES.buttonLarge}
              text={comittment}
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
          className={STYLES.buttonLarge}
          text="Take the Assessment"
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
          className={STYLES.buttonLarge}
          text="Start from scratch!"
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

  const content = useMemo(() => {
    switch (currentStep) {
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
  }, [
    currentStep,
    renderCountryExamStep,
    renderAdNoticeStep,
    renderAcademicStatusStep,
    renderGoalStep,
    renderCommitmentStep,
    renderStartStep,
  ]);

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
    <view className={STYLES.container}>
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
          progressBar:
            'flex flex-row justify-center items-center gap-4 bg-[#f8f9fa] w-[230px] h-[40px] rounded-full',
          currentStepLabel: 'text-2xl w-[350px] my-10',
        }}
      />
      <view className={STYLES.contentContainer}>{content}</view>
      <Button
        text="CONTINUE"
        variant="orange"
        disabled={isContinue}
        onTap={() => handleStepChange(1)}
        className={`mb-10 ${isContinue && STYLES.disabled} ${STYLES.buttonCommon}`}
      />
    </view>
  );
}
