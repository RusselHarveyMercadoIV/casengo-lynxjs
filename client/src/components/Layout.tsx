import { Outlet, useNavigate } from 'react-router';
import icons from '../constants/icons.js';
import { DIAGNOSTIC_QUESTIONS } from '../constants/question-bank.js';

export default function Layout() {
  const navigation = useNavigate();

  return (
    <view className="flex flex-col h-full justify-between">
      {/* This is where nested components will render */}
      <Outlet />

      <view className=" flex flex-row w-full px-4 py-6 justify-around items-center border-t border-[#dee1e6]">
        {/* Your navigation button(s) or links */}
        <view bindtap={() => navigation('/home')}>
          <image src={icons.home} className="w-8 h-8" />
        </view>

        <view
          className="bg-[#ed7d2d] rounded-full p-2"
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
        <view bindtap={() => navigation('/profile')}>
          <image src={icons.profile} className="w-8 h-8" />
        </view>
      </view>
    </view>
  );
}
