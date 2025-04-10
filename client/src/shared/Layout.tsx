import { Outlet, useNavigate } from 'react-router';
import icons from '../constants/icons.js';
import { DIAGNOSTIC_QUESTIONS } from '../constants/question-bank.js';

export default function Layout() {
  const navigation = useNavigate();

  return (
    <view className="bg-white flex flex-col h-full justify-between items-center">
      <view className=" w-full flex flex-row justify-between items-center mt-6 px-6 py-4">
        <view className="flex flex-row gap-1 items-center px-2 rounded-lg">
          <image src={icons.philippines} className="w-6 h-6 rounded-lg" />
        </view>
        <view className="flex flex-row gap-1 items-center">
          <image src={icons.streak} className="w-6 h-6" />
          <text className="text-md font-bold text-[#ed7d2d]">7</text>
        </view>
        <view className="flex flex-row items-center">
          <image src={icons.potion} className="w-8 h-8" />
          <text className="text-md font-bold text-[#CC5DE8]">100</text>
        </view>
        <view className="flex flex-row gap-1 items-center">
          <image src={icons.heart} className="w-6 h-6" />
          <text className="text-md font-bold text-[#e05858]">5</text>
        </view>
      </view>

      <Outlet />

      <view className=" flex flex-row w-full py-4 justify-around items-center min-h-16">
        <view
          className=" h-full grow flex justify-center items-center"
          bindtap={() => navigation('/home')}
        >
          <image src={icons.home} className="w-9 h-8" />
        </view>

        <view
          className="bg-[#ed7d2d] rounded-full grow px-14 py-3 w-16 flex justify-center items-center"
          bindtap={() =>
            navigation('/content', {
              state: {
                content: DIAGNOSTIC_QUESTIONS,
                academicStatus: 'Freshman',
                type: 'quiz',
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
          <image src={icons.profile} className="w-8 h-9" />
        </view>
      </view>
    </view>
  );
}
