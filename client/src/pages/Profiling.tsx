import { useState } from 'react';
import Button from '../components/Button/Button.jsx';
import Separator from '../components/Separator.jsx';

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
import Steps from '../components/Steps.jsx';
import { headers } from '../constants/start.js';

const profilingData: profilingDataType = {
  countryExam: '',
  appNotice: '',
  academicStatus: '',
  goal: '',
  comittment: '',
  start: '',
};

export default function Profiling() {
  const [formData, setFormData] = useState<profilingDataType>(profilingData);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const navigation = useNavigate();

  const handleDataChange = (
    type: keyof profilingDataType,
    value: profilingDataType[keyof profilingDataType],
  ) => {
    if (type === 'academicStatus') {
      const isDisabled =
        !['Recent Graduate', 'Senior'].includes(value) &&
        formData.goal === 'Prepare for PNLE';
      if (isDisabled) {
        setFormData((prevData) => ({ ...prevData, goal: '' }));
      }
    }
    setFormData((prevData) => ({ ...prevData, [type]: value }));
  };

  const handleStepChange = (step: number) => {
    if (currentStep === 6 && step > 0) {
      navigation('quiz', {
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

  let commonButtonCss = 'min-w-[350px] min-h-[60px]';

  const buttonCss =
    'flex-row gap-5 py-4 px-8 justify-start items-center w-[350px] ';

  const disabledCss = 'opacity-40';

  const imgCss = 'w-10 h-10 rounded-2xl  ';

  let content = (
    <>
      <Button
        key={'p1-1'}
        variant="plain"
        className={buttonCss}
        text="PNLE"
        isHighlighted={formData.countryExam === 'PNLE'}
        icon={<image src={icons.philippines} className={imgCss} />}
        onTap={
          formData.countryExam === 'PNLE'
            ? () => handleDataChange('countryExam', '')
            : () => handleDataChange('countryExam', 'PNLE')
        }
      />

      <Separator className="mt-16 mb-12" />
      <view className="flex flex-col justify-center items-center gap-10 w-[350px]">
        <text className="text-2xl text-[#9095a0]">Coming soon...</text>
        <view className="flex flex-col gap-5">
          <Button
            key={'p1-2'}
            className={buttonCss + disabledCss}
            variant="plain"
            icon={<image src={icons.america} className={imgCss} />}
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
            className={buttonCss + disabledCss}
            disabled={true}
            text="NCLEX - PN"
            variant="plain"
            icon={<image src={icons.america} className={imgCss} />}
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
  );

  if (currentStep === 2) {
    const buttonCss =
      'flex-row gap-5 py-4 px-8 justify-start items-center w-[350px]';

    const imgCss = 'w-8 h-8 rounded-2xl';

    const adNotice: adNoticeType = {
      'Google Search': icons.google,
      Facebook: icons.facebook,
      Youtube: icons.youtube,
      'Friends/family': icons.people,
      Others: icons.more,
    };

    content = (
      <view className="flex flex-col gap-6">
        {(Object.keys(adNotice) as Array<keyof adNoticeType>).map(
          (choice: keyof adNoticeType) => (
            <Button
              key={choice}
              className={buttonCss}
              text={choice}
              variant="plain"
              isHighlighted={formData.appNotice === choice}
              icon={<image src={adNotice[choice]} className={imgCss} />}
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
  }

  if (currentStep === 3) {
    const buttonCss =
      'flex-row gap-5 py-4 px-8 justify-start items-center w-[350px]';

    const imgCss = 'w-8 h-8';

    const academicStatuses: academicStatusesType = {
      Freshman: icons.syringe,
      Sophomore: icons.nursecap,
      Junior: icons.stethoscope,
      Senior: icons.nurse,
      'Recent Graduate': icons.note,
    };

    content = (
      <view className="flex flex-col gap-6">
        {(
          Object.keys(academicStatuses) as Array<keyof academicStatusesType>
        ).map((choice: keyof academicStatusesType) => (
          <Button
            key={choice}
            className={buttonCss}
            text={choice}
            variant="plain"
            isHighlighted={formData.academicStatus === choice}
            icon={<image src={academicStatuses[choice]} className={imgCss} />}
            onTap={
              formData.academicStatus === choice
                ? () => handleDataChange('academicStatus', '')
                : () => handleDataChange('academicStatus', choice)
            }
          />
        ))}
      </view>
    );
  }

  if (currentStep === 4) {
    const buttonCss = `flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]`;

    const goals = [
      'Build foundational knowledge',
      'Strengthen clinical skills',
      'Prepare for PNLE',
    ] as const;

    content = (
      <view className="flex flex-col gap-6">
        {goals.map((goal) => {
          const isDisabled =
            !['Recent Graduate', 'Senior'].includes(formData.academicStatus) &&
            goal === 'Prepare for PNLE';

          return (
            <Button
              key={goal}
              className={buttonCss}
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
    );
  }

  if (currentStep === 5) {
    const buttonCss =
      'flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]';

    const comittments: comittmentsType = {
      '3 min / day': 'Casual',
      '10 min / day': 'Regular',
      '15 min / day': 'Serious',
      '30 min / day': 'Intense',
    };

    content = (
      <view className="flex flex-col gap-6">
        {(Object.keys(comittments) as (keyof comittmentsType)[]).map(
          (comittment: keyof comittmentsType) => (
            <Button
              key={comittment}
              className={buttonCss}
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
    );
  }

  if (currentStep === 6) {
    const buttonCss =
      'flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]';

    content = (
      <view className="flex flex-col gap-6">
        <Button
          key={'p6-1'}
          className={buttonCss}
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
          className={buttonCss}
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
    );
  }

  const steps = Object.keys(formData);
  const current = formData[steps[currentStep - 1] as keyof profilingDataType];
  const isContinue = current === '';

  return (
    <view className="container mt-[25px] flex-col justify-start items-center h-full">
      {currentStep >= 1 && (
        <Steps
          header={headers[currentStep]?.header}
          currentStep={currentStep}
          formData={formData}
          icon={icons.leftArrow}
          onStepChange={() => handleStepChange(-1)}
        />
      )}
      <view className="flex-col flex gap-14 mb-14 grow justify-center items-center">
        {content}
      </view>
      {currentStep >= 1 && (
        <Button
          text="CONTINUE"
          variant="orange"
          disabled={isContinue}
          onTap={() => handleStepChange(1)}
          className={`mb-10 ${isContinue && 'opacity-40'} ${commonButtonCss}`}
        />
      )}
    </view>
  );
}
