import { useNavigate } from 'react-router';

import Button from '../components/Button/Button.jsx';

import Separator from '../components/Separator.jsx';

export default function Start() {
  const navigation = useNavigate();

  let commonButtonCss = 'min-w-[350px] min-h-[60px] justify-center';

  const handleSignIn = () => {
    navigation('/login');
  };

  const handleGetStarted = () => {
    navigation('/profiling');
  };

  return (
    <view className="container mt-[25px] flex-col justify-start items-center h-full">
      <view className="grow justify-center items-center">
        <view className="flex-col relative flex gap-10 justify-center items-center">
          <text className="text-2xl text-[#323842]">
            Already have an account?
          </text>
          <Button
            text={'SIGN IN'}
            variant="orange"
            bold={true}
            className={commonButtonCss}
            onTap={handleSignIn}
          />
        </view>
        <Separator className="mt-16 mb-12" />
        <view className="flex-col relative flex gap-10 justify-center items-center">
          <text className="text-2xl text-[#323842] line-30">
            New to Casengo?
          </text>
          <Button
            text={'GET STARTED'}
            variant="white"
            bold={true}
            onTap={handleGetStarted}
            className={commonButtonCss}
          />
        </view>
      </view>
    </view>
  );
}
