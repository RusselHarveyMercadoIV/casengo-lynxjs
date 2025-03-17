import { useState } from 'react';
import { useNavigate } from 'react-router';

import { DIAGNOSTIC_QUESTIONS } from '../constants/question-bank.js';
import type { AcademicStatus, profilingDataType } from '../types/types.js';
import Button from '../components/Button/Button.jsx';

import icons from '../constants/icons.js';
import { headers } from '../constants/start.js';
import Steps from '../components/Steps.jsx';
import Profiling from './Profiling.jsx';

const profilingData: profilingDataType = {
  countryExam: '',
  appNotice: '',
  academicStatus: '',
  goal: '',
  comittment: '',
  start: '',
};

export default function Start() {
  const [formData, setFormData] = useState<profilingDataType>(profilingData);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const navigation = useNavigate();

  let commonButtonCss = 'min-w-[350px] min-h-[60px]';

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
      navigation('profiling', {
        state: {
          questions: DIAGNOSTIC_QUESTIONS,
          academicStatus: formData?.academicStatus as AcademicStatus,
        },
      });
    } else {
      setCurrentStep((prevStep) => prevStep + step);
    }
  };

  const steps = Object.keys(formData);
  const current = formData[steps[currentStep - 1] as keyof profilingDataType];
  const isContinue = current === '';

  return (
    <view className="container mt-[25px] flex-col justify-start items-center h-full">
      {currentStep > 0 && (
        <Steps
          header={headers[currentStep].header}
          currentStep={currentStep}
          formData={formData}
          icon={icons.leftArrow}
          onStepChange={() => handleStepChange(-1)}
        />
      )}
      <Profiling
        handleDataChange={handleDataChange}
        handleStepChange={handleStepChange}
        formData={formData}
        currentStep={currentStep}
      />
      {currentStep > 0 && (
        <Button
          text="CONTINUE"
          variant="orange"
          onTap={() => handleStepChange(1)}
          className={`mb-10 mt-10 ${isContinue && 'opacity-40'} ${commonButtonCss}`}
        />
      )}
    </view>
  );
}
