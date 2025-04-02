import { useNavigate } from 'react-router';
import Button from '../components/Button/Button.jsx';
import Card from '../components/Card.jsx';
import icons from '../constants/icons.js';

import BANNER from '../assets/cover/casengo_banner.png';
import { useEffect, useRef } from 'react';
import type { NodesRef } from '@lynx-js/types';

const cardNavigations = [
  {
    id: '1',
    title: 'Fundamentals',
    icon: icons.checklist,
    sub: 'Patient safety and communication',
    path: 'subject',
  },
  {
    id: '2',
    title: 'Core',
    icon: icons.books,
    sub: 'Patient safety and communication',
    path: 'subject',
  },
  {
    id: '3',
    title: 'Case Studies',
    icon: icons.magnifying,
    sub: 'Patient safety and communication',
    path: 'subject',
  },
  {
    id: '4',
    title: 'Theory',
    icon: icons.theory,
    sub: 'Patient safety and communication',
    path: 'subject',
  },
  {
    id: '5',
    title: 'Suggestions',
    icon: icons.chat,
    sub: 'Patient safety and communication',
    path: 'subject',
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
        <view className="flex flex-col w-[350px] mb-10">
          <view className=" flex flex-col gap-4">
            <list
              // ref={galleryRef}
              className="list"
              list-type="waterfall"
              column-count={1}
              scroll-orientation="horizontal"
              custom-list-name="list-container"
              style={{ borderRadius: '16px' }}
            >
              <list-item item-key={'1'} key={'1'} className="rounded-xl">
                <view className="flex flex-col justify-center items-start w-[350px] h-[220px] bg-[#ed7d2d] rounded-xl mr-4">
                  <image
                    src={BANNER}
                    className="w-full h-full object-cover rounded-xl"
                  />

                  <text className="absolute right-4 bottom-2 text-sm text-white">
                    read blog
                  </text>
                </view>
              </list-item>
              <list-item item-key={'2'} key={'2'}>
                <view className="flex flex-col justify-center items-center w-[350px] h-[220px] bg-white rounded-xl border border-[#dee1e6]">
                  <text className="text-3xl text-[#9095a0]">
                    The science of learning
                  </text>

                  <text className="absolute right-4 bottom-2 text-sm ">
                    read blog
                  </text>
                </view>
              </list-item>
            </list>
          </view>
        </view>
        {/* <view className="flex h-fit flex-col gap-8">
          <text className="font-semibold">Recent Activities</text>
          <list
            className="flex justify-between w-[350px]"
            list-type="waterfall"
            scroll-orientation="horizontal"
            custom-list-name="list-container"
          >
            {cardNavigations.map((item) => (
              <list-item
                item-key={item.id}
                key={item.id}
                className="mr-6"
                bindtap={() =>
                  navigation(`/${item.path}`, {
                    state: { chosenSubject: item.title },
                  })
                }
              >
                <Card title={item.title}>
                  <image src={item.icon} className="w-16 h-16" />
                </Card>
              </list-item>
            ))}
          </list>
        </view> */}
        <view className=" flex flex-col gap-8">
          <text className="font-semibold">Daily Case</text>

          <Button
            className="w-[350px] h-[100px] px-5 gap-6 "
            variant="plain"
            textStyle=" font-semibold"
            text="How to handle a patient with a broken leg?"
          />
        </view>
        <view className=" flex flex-col mt-10 gap-8">
          <text className="font-semibold">Browse</text>
          <list
            className="flex justify-between w-[350px] "
            list-type="waterfall"
            scroll-orientation="vertical"
            column-count={3}
            custom-list-name="list-container"
          >
            {cardNavigations.map((item) => (
              <list-item
                item-key={item.id}
                key={item.id}
                bindtap={() =>
                  navigation(`/${item.path}`, {
                    state: { chosenSubject: item.title },
                  })
                }
              >
                <Card title={item.title}>
                  <image src={item.icon} className="w-10 h-10" />
                </Card>
              </list-item>
            ))}
          </list>
        </view>
      </scroll-view>
    </view>
  );
}
