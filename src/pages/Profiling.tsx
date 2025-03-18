import { useState } from 'react';
import Button from '../components/Button/Button.jsx';
import Separator from '../components/Separator.jsx';

import icons from '../constants/icons.js';
import type { AcademicStatus, profilingDataType } from '../types/types.js';
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
            // disabled={true}
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
            // disabled={true}
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

  const steps = Object.keys(formData);
  const current = formData[steps[currentStep - 1] as keyof profilingDataType];
  const isContinue = current === '';

  return (
    <view className="container mt-[25px] flex-col justify-start items-center h-full">
      {currentStep >= 1 && (
        <Steps
          header={headers[currentStep].header}
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
          onTap={() => handleStepChange(1)}
          className={`mb-10 ${isContinue && 'opacity-40'} ${commonButtonCss}`}
        />
      )}
    </view>
  );
}
