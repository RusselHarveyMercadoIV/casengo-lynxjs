import Button from './Button/Button.jsx';

export default function Steps({
  currentStep,
  icon,
  onStepChange,
  formData,
  header,
}: {
  currentStep: number;
  icon?: string;
  onStepChange: () => void;
  formData: any;
  header?: string;
}) {
  const stepsForm = 'w-6 h-6 rounded-full';
  const finishedStep = 'bg-[#ed7d2d]';
  const unfinishedStep = 'bg-[#dee1e6]';

  return (
    <>
      <Button
        variant="plain"
        icon={icon && <image src={icon} className="w-6 h-6" />}
        onTap={onStepChange}
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
      {header && <text className="text-2xl w-[350px] my-10  ">{header}</text>}
    </>
  );
}
