import { useLocation } from 'react-router';

import { SUBJECT_PATHS } from '../constants/path.js';
import { useEffect, useState } from 'react';

export default function Path() {
  const [chapter, setChapter] = useState<any>();
  const location = useLocation();

  const { chosenSubject, chosenChapter } = location.state as {
    chosenSubject: string;
    chosenChapter: number;
  };

  useEffect(() => {
    const foundSubject = SUBJECT_PATHS.find(
      (item) => item?.subject === chosenSubject,
    );
    if (!foundSubject) {
      console.error('Subject not found:', chosenChapter);
      return;
    }
    const foundChapter = foundSubject?.chapters?.find(
      (chapter) => chapter.chapter === chosenChapter,
    );
    if (!foundChapter) {
      console.error('Chapter not found:', chosenChapter);
      return;
    }
    setChapter(foundChapter);
  }, [chosenSubject]);

  return (
    <view className="flex flex-col items-center justify-center">
      <text className="text-2xl font-bold mb-4">Path</text>
      <text className="text-lg">You have selected: {chosenChapter}</text>
      {chapter?.data.map((item: any) => (
        <view key={item.id} className="p-4 rounded-lg shadow-md mb-4 w-[350px]">
          <text className="text-lg font-semibold">{item.title}</text>
        </view>
      ))}
    </view>
  );
}
