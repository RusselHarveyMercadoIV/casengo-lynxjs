import Button from '../components/Button/Button.jsx';
import Separator from '../components/Separator.jsx';

import icons from '../constants/icons.js';
import type { profilingDataType } from '../types/types.js';

type ProfilingType = {
  handleDataChange: (
    type: keyof profilingDataType,
    value: profilingDataType[keyof profilingDataType],
  ) => void;
  handleStepChange: (step: number) => void;
  currentStep: number;
  formData: profilingDataType;
};

export default function Profiling({
  handleDataChange,
  handleStepChange,
  currentStep,
  formData,
}: ProfilingType) {
  let commonButtonCss = 'min-w-[350px] min-h-[60px]';

  let content = (
    <>
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
    </>
  );

  if (currentStep === 1) {
    const buttonCss =
      'flex-row gap-5 py-4 px-8 justify-start items-center w-[350px] ';

    const disabledCss = 'opacity-40';

    const imgCss = 'w-10 h-10 rounded-2xl  ';

    content = (
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
  }

  return (
    <view className="flex-col flex gap-14 mb-14 grow justify-center items-center">
      {content}
    </view>
  );
}
