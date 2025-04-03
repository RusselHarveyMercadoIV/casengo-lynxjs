import { useNavigate } from 'react-router';
import Button from '../components/Button/Button.jsx';
import Card from '../components/Card.jsx';
import icons from '../constants/icons.js';

import BANNER from '../assets/cover/casengo_banner.png';
import { useEffect, useRef } from 'react';
import type { NodesRef } from '@lynx-js/types';
import { Swiper } from '../components/Swiper.jsx';

const cardNavigations = [
  {
    id: '1',
    title: 'Fundamentals',
    icon: icons.checklist,
    sub: 'Patient safety and communication',
    path: 'subject',
    size: 'w-12 h-14',
  },
  {
    id: '2',
    title: 'Core',
    icon: icons.books,
    sub: 'Patient safety and communication',
    path: 'subject',
    size: 'w-12 h-14',
  },
  {
    id: '3',
    title: 'Case Studies',
    icon: icons.magnifying,
    sub: 'Patient safety and communication',
    path: 'subject',
    size: 'w-14 h-14',
  },
  {
    id: '4',
    title: 'Theories',
    icon: icons.theory,
    sub: 'Patient safety and communication',
    path: 'subject',
    size: 'w-14 h-14',
  },
  {
    id: '5',
    title: 'Suggestions',
    icon: icons.chat,
    sub: 'Patient safety and communication',
    path: 'subject',
    size: 'w-14 h-14',
  },
];

export default function Home() {
  const navigation = useNavigate();

  const galleryRef = useRef<NodesRef>(null);

  useEffect(() => {
    galleryRef.current
      ?.invoke({
        method: 'autoScroll',
        params: {
          rate: '60',
          start: true,
        },
      })
      .exec();
  }, []);

  return (
    <view className="flex  flex-col h-full justify-center items-center">
      {/* <view className="fixed top-10 right-5 bg-yellow-500 rounded-full">
        <image src={icons.trophy} className="p-2 w-16 h-16" />
      </view> */}

      <scroll-view
        className="flex flex-col items-center pt-2 h-full w-full"
        scroll-orientation="vertical"
      >
        <view className="flex flex-col w-[350px] h-[220px] mb-10 rounded-xl">
          <Swiper data={[BANNER]} itemWidth={350} />
        </view>
        <view className=" flex flex-col gap-8">
          <text className="font-semibold">Continue learning</text>
          <view className="flex flex-col justify-center items-start w-[350px] h-[120px] bg-[#ed7d2d] rounded-xl px-4 py-2">
            <view className="flex flex-row justify-between items-center w-full">
              <view>
                <text className="text-sm text-[#ed7d2d] px-4 py-1 bg-[#fff3ea] w-fit rounded-full">
                  Anatomy & Physiology
                </text>
                <text className="text-white text-xl font-bold mb-2">
                  An Introduction to the Human Body
                </text>
                <text className="text-white text-sm">
                  Continue where you left off{' -> '}
                </text>
              </view>
            </view>

            <view className="w-full bg-white rounded-full h-5 relative mt-2">
              <view
                className="bg-orange-300 h-5 rounded-full transition-all"
                style={{ width: '70%' }}
              ></view>
            </view>
          </view>
        </view>
        <view className=" flex flex-col mt-10 mb-20 gap-8">
          <text className="font-semibold">Browse</text>
          <view className="w-[350px] grid grid-cols-3 gap-4 ">
            {cardNavigations.map((item) => (
              <view
                item-key={item.id}
                key={item.id}
                bindtap={() =>
                  navigation(`/${item.path}`, {
                    state: { chosenSubject: item.title },
                  })
                }
                className="items-center"
              >
                <Card title={item.title}>
                  <image src={item.icon} className={item.size} />
                </Card>
              </view>
            ))}
          </view>
        </view>
      </scroll-view>
    </view>
  );
}
