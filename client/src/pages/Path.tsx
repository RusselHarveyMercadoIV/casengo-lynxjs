import { useLocation, useNavigate } from 'react-router';

import { SUBJECT_PATHS } from '../constants/path.js';
import { useEffect, useState } from 'react';

import PathNode from '../components/PathNode/index.jsx';
import Card from '../components/Card.jsx';

export default function Path() {
  const [chapter, setChapter] = useState<{ parent: any; data: any } | null>(
    null,
  );
  const navigation = useNavigate();
  const location = useLocation();

  const { chosenSubject, chosenChapter } = location.state as {
    chosenSubject: string;
    chosenChapter: number;
  };

  useEffect(() => {
    const foundSubject = SUBJECT_PATHS.find(
      (item) => item?.re === chosenSubject,
    );
    if (!foundSubject) {
      console.error('Subject not found:', chosenChapter);
      return;
    }
    const foundChapter = foundSubject?.chapters?.find(
      (chapter) => chapter.id === chosenChapter,
    );
    if (!foundChapter) {
      console.error('Chapter not found:', chosenChapter);
      return;
    }
    setChapter({ parent: foundSubject, data: foundChapter });
  }, [chosenSubject]);

  return (
    <view className="flex flex-col gap-10  h-full items-center ">
      <scroll-view
        scroll-orientation="vertical"
        className="flex  flex-col w-[350px] mb-2 h-full"
      >
        <Card className="sticky top-0 bg-white px-4 py-6 flex flex-col gap-5 w-[350px] border-2 rounded-2xl border-[#bcc1ca] mb-5 z-10">
          <view className="flex flex-row  w-full">
            <text className="text-[#9095a0] w-fit text-bold text-xl">
              {chapter?.data?.title}
            </text>
          </view>
          <view className="flex flex-row w-full gap-5">
            <text className="text-[#9095a0] ">
              Nodes {chapter?.data?.totalNodes}
            </text>
            <text className="text-[#9095a0]">
              Completed {chapter?.data?.completedNodes}
            </text>
          </view>
        </Card>

        {chapter?.data?.subChapters.map((item: any, index: number) => (
          <view
            key={item.id}
            className="flex flex-col justify-center items-center relative w-full"
          >
            {index > 0 && <view className="w-[2px] h-16 bg-[#bcc1ca]" />}
            {index > 0 && (
              <view className="w-14 h-14 flex justify-center items-center rounded-full bg-[#bcc1ca]"></view>
            )}
            {index > 0 && <view className="w-[2px] h-8 bg-[#bcc1ca]" />}

            {index > 0 && (
              <view className="w-14 h-14 flex justify-center items-center rounded-full bg-[#bcc1ca]"></view>
            )}
            {index > 0 && <view className="w-[2px] h-16 bg-[#bcc1ca]" />}
            <PathNode
              onTap={() =>
                navigation('/quiz', {
                  state: {
                    content: item,
                    attribution: chapter?.data?.attribution,
                    parent: chapter.parent,
                    academicStatus: 'Freshman',
                    type: 'discussion',
                  },
                })
              }
            >
              <text className="text-lg font-semibold text-[#9095a0]">
                {item.title}
              </text>
            </PathNode>
          </view>
        ))}
      </scroll-view>
    </view>
  );
}
