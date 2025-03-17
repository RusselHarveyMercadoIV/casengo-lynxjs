import { useState } from 'react';
import { useNavigate } from 'react-router';

import { DIAGNOSTIC_QUESTIONS } from '../constants/question-bank.js';
import type { AcademicStatus, profilingDataType } from '../types/types.js';
import Button from '../components/Button/Button.jsx';

import icons from '../constants/icons.js';
import { headers } from '../constants/start.js';
import Separator from '../components/Separator.jsx';

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

  let commonButtonCss = 'min-w-[350px] min-h-[60px]';

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

  let content = (
    <view className="flex-col flex gap-14 mb-14 grow justify-center items-center">
      <view className="flex-col relative flex gap-10 justify-center items-center">
        <text className="text-2xl text-[#323842]">
          Already have an account?
        </text>
        <Button text={'SIGN IN'} variant="orange" className={commonButtonCss} />
      </view>
      <Separator />
      <view className="flex-col relative flex gap-10 justify-center items-center">
        <text className="text-2xl text-[#323842] line-30">New to Casengo?</text>
        <Button
          text={'GET STARTED'}
          variant="white"
          onTap={() => handleStepChange(1)}
          className={commonButtonCss}
        />
      </view>
    </view>
  );

  if (currentStep === 1) {
    const buttonCss =
      'flex-row gap-5 py-4 px-8 justify-start items-center w-[350px] ';

    const disabledCss = 'opacity-40';

    const imgCss = 'w-10 h-10 rounded-2xl  ';

    content = (
      <scroll-view className="flex gap-10 grow justify-center items-center">
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
      </scroll-view>
    );
  }

  const stepsForm = 'w-6 h-6 rounded-full';
  const finishedStep = 'bg-[#ed7d2d]';
  const unfinishedStep = 'bg-[#dee1e6]';

  const steps = Object.keys(formData);
  const current = formData[steps[currentStep - 1] as keyof profilingDataType];
  const isContinue = current === '';

  return (
    <view className="container mt-[25px] flex-col justify-start items-center h-full">
      {currentStep > 0 && (
        <>
          <Button
            variant="plain"
            icon={<image src={icons.leftArrow} className="w-6 h-6" />}
            onTap={() => handleStepChange(-1)}
            className="absolute top-6 left-6 border-none"
          />
          <view className="flex flex-row items-center justify-center w-[350px]">
            <view
              className={
                ' flex flex-row justify-center items-center gap-4 bg-[#f8f9fa] w-[230px] h-[40px] rounded-full'
              }
            >
              <view
                className={`${stepsForm} ${
                  currentStep >= 1 ? finishedStep : unfinishedStep
                }`}
              />
              <view
                className={`${stepsForm} ${
                  currentStep >= 2 || formData.appNotice !== ''
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
              <view
                className={`${stepsForm} ${
                  currentStep >= 3 || formData.academicStatus !== ''
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
              <view
                className={`${stepsForm} ${
                  currentStep >= 4 || formData.goal !== ''
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
              <view
                className={`${stepsForm} ${
                  currentStep >= 5 || formData.comittment !== ''
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
              <view
                className={`${stepsForm} ${
                  currentStep === 6 || formData.start !== ''
                    ? finishedStep
                    : unfinishedStep
                }`}
              />
            </view>
          </view>
          <text className="text-2xl w-[350px] mt-10  ">
            {headers[currentStep - 1]?.header}
          </text>
        </>
      )}
      {content}
      {currentStep > 0 && (
        <Button
          text="CONTINUE"
          variant="orange"
          onTap={() => handleStepChange(1)}
          className={`mb-10  ${isContinue && 'opacity-40'} ${commonButtonCss}`}
        />
      )}
    </view>
  );
}
