import { useState } from 'react';
import { useNavigate } from 'react-router';

import { DIAGNOSTIC_QUESTIONS } from '../constants/question-bank.js';
import type { AcademicStatus, profilingDataType } from '../types/types.js';

import OrangeButton from '../assets/images/button-orange-1.png';
import WhiteButton from '../assets/images/button-white-1.png';
import Button from '../components/Button/Button.jsx';

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

  const handleStepChange = (step: number) => {
    if (currentStep === 6 && step > 0) {
      navigation('quiz', {
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
    <view className="flex-col flex gap-14 mb-14">
      <view className="flex-col relative flex gap-10 justify-center items-center">
        <text className="text-2xl text-[#323842]">
          Already have an account?
        </text>
        <Button text={'SIGN IN'} variant="orange" />
      </view>
      <view className="border border-1 border-[#dee1e6]" />
      <view className="flex-col relative flex gap-10 justify-center items-center">
        <text className="text-2xl text-[#323842] line-30">New to Casengo?</text>
        <image src={WhiteButton} className=" w-[350px] h-[65px]" />
        <view
          className=" w-[350px] h-[65px] absolute top-[60px] flex justify-center items-center"
          bindtap={() => handleStepChange(1)}
        >
          <text className="text-xl text-[#ed7d2d] font-bold">GET STARTED</text>
        </view>
      </view>
    </view>
  );

  return (
    <view className="container justify-center items-center h-full">
      {content}
    </view>
  );
}
