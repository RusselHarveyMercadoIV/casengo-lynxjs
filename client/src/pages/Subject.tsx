import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Button from '../components/Button/Button.jsx';
import icons from '../constants/icons.js';

const subjects = [
  {
    title: 'Fundamentals',
    name: 'Fundamentals',
    description: 'Master the fundamentals of nursing',
    subjects: [
      {
        title: 'Theories and Practice',
        icon: icons.bulb,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
      },
      {
        title: 'Communication',
        icon: icons.communication,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
      },
      {
        title: 'Healthcare Delivery Systems',
        icon: icons.delivery,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
      },
      {
        title: 'Community-Based Health Care',
        icon: icons.community,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
      },
    ],
  },
  {
    title: 'Anatomy/Physiology',
    name: 'Anatomy & Physiology',
    description: 'Master the Anatomy & Physiology subject essential in nursing',
    subjects: [
      {
        chapter: 1,
        title: 'An Introduction to the Human Body',
        icon: icons.human,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
      },
      {
        chapter: 2,
        title: 'The Chemical Level of Organization',
        icon: icons.molecule,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
      },
      {
        chapter: 3,
        title: 'The Cellular Level of Organization',
        icon: icons.cell,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
      },
      {
        chapter: 4,
        title: 'The Tissue Level of Organization',
        icon: icons.muscle,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
      },
    ],
  },
  {
    title: 'Microbiology',
    name: 'Microbiology',
    description: 'Master the Microbiology subject essential in nursing',
    subjects: [],
  },
  {
    title: 'Pharmacology',
    name: 'Pharmacology',
    description: 'Master the Pharmacology subject essential in nursing',
    subjects: [],
  },
  {
    title: 'Pathophysiology',
    name: 'Pathophysiology',
    description: 'Master the Pathophysiology subject essential in nursing',
    subjects: [],
  },
  {
    title: 'Case Studies',
    name: 'Case Studies',
    description: 'Master the core subjects essential in nursing',
    subjects: [],
  },
  {
    title: 'Theories',
    name: 'Theories',
    description: 'Master the core subjects essential in nursing',
    subjects: [],
  },
];

export default function Subject() {
  const [currentSubject, setCurrentSubject] = useState<any>();
  const location = useLocation();
  const navigation = useNavigate();

  const { chosenSubject } = location.state as {
    chosenSubject: string;
  };

  useEffect(() => {
    const foundSubject = subjects.find((item) => item?.name === chosenSubject);
    setCurrentSubject(foundSubject);
  }, [chosenSubject]);

  const handleSubjectChange = (subject: any) => {
    setCurrentSubject(subject);
  };

  const handleChosenTopic = (chapter: number) => {
    navigation('/path', {
      state: {
        chosenSubject: currentSubject?.name,
        chosenChapter: chapter,
      },
    });
  };

  return (
    <view className="flex h-full flex-col gap-10 justify-start items-center">
      <scroll-view
        className={'w-[350px] flex justify-between items-center'}
        scroll-orientation="horizontal"
      >
        {subjects.map((subject, index) => (
          <text
            key={index}
            className={`text-lg py-1  ${currentSubject?.name === subject?.name ? 'text-[#ed7d2d] font-bold border-b-4 border-[#ed7d2d]' : 'text-[#9095a0]'} mr-4`}
            bindtap={() => handleSubjectChange(subject)}
          >
            {subject?.title}
          </text>
        ))}
      </scroll-view>
      <view className="flex flex-col gap-5 w-[350px]">
        <text className="text-4xl text-[#515358] font-semibold">
          {currentSubject?.name}
        </text>
        <text className="w-[200px] text-[#9095a0]">
          {currentSubject?.description}
        </text>
      </view>
      <scroll-view
        className="flex h-[440px] flex-col justify-between"
        scroll-orientation="vertical"
      >
        {currentSubject?.subjects?.map((subject: any) => (
          <Button
            className="w-[300px] h-[100px] px-5 gap-6"
            variant="plain"
            textStyle="text-[#9095a0] font-semibold"
            text={subject?.title}
            icon={<image src={subject?.icon} className="w-12 h-12" />}
            onTap={() => handleChosenTopic(subject?.chapter)}
          />
        ))}
      </scroll-view>
    </view>
  );
}
