import { Outlet, useNavigate } from 'react-router';
import icons from '../constants/icons.js';
import { DIAGNOSTIC_QUESTIONS } from '../constants/question-bank.js';

export default function Layout() {
  const navigation = useNavigate();

  return (
    <view className="bg-white flex flex-col h-full ">
      <view className="flex flex-row justify-between items-center mt-8 px-6 py-4">
        <view className="flex flex-row gap-1 items-center">
          <image src={icons.streak} className="w-6 h-6" />
          <text className="text-md font-semibold text-[#ed7d2d]">7</text>
        </view>
        <view className="flex flex-row gap-1 items-center">
          <image src={icons.energy} className="w-6 h-6" />
          <text className="text-md font-semibold text-[#E0D100]">5</text>
        </view>
        <view className="flex flex-row gap-1 items-center">
          <image src={icons.heart} className="w-6 h-6" />
          <text className="text-md font-semibold text-[#e05858]">5</text>
        </view>
      </view>
      <Outlet />

      <view className="fixed bg-white bottom-0 flex flex-row w-full justify-around items-center h-14">
        <view
          className=" h-full grow flex justify-center items-center"
          bindtap={() => navigation('/home')}
        >
          <image src={icons.home} className="w-8 h-8" />
        </view>

        <view
          className="bg-[#ed7d2d] rounded-full grow px-14 py-3 w-16 flex justify-center items-center"
          bindtap={() =>
            navigation('/quiz', {
              state: {
                questions: DIAGNOSTIC_QUESTIONS,
                academicStatus: 'Freshman',
                type: 'diagnostic',
              },
            })
          }
        >
          <image
            src={icons.session}
            className="w-8 h-8 "
            // style={{ fill: '#fff' }}
          />
        </view>
        <view
          className=" h-full grow flex justify-center items-center"
          bindtap={() => navigation('/profile')}
        >
          <image src={icons.profile} className="w-8 h-8" />
        </view>
      </view>
    </view>
  );
}
