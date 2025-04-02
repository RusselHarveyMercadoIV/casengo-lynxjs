import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Button from '../components/Button/Button.jsx';
import icons from '../constants/icons.js';

const subjects = [
  {
    title: 'Fundamentals',
    name: 'Fundamentals',
    description: 'Master the core subjects essential in nursing',
    subjects: [{ title: 'Patient care' }],
  },
  {
    title: 'Core',
    name: 'Core Subjects',
    description: 'Master the core subjects essential in nursing',
    subjects: [
      {
        title: 'Anatomy & Physiology',
        icon: icons.lungs,
      },
      {
        title: 'Microbiology',
        icon: icons.microscope,
      },
      {
        title: 'Pharmacology',
        icon: icons.pill,
      },
      {
        title: 'Pathophysiology',
        icon: icons.diagram,
      },
    ],
  },
  {
    title: 'Case study',
    name: 'Case study',
    description: 'Master the core subjects essential in nursing',
    subjects: [{}],
  },
  {
    title: 'Theories',
    name: 'Theories',
    description: 'Master the core subjects essential in nursing',
    subjects: [{}],
  },
];

export default function Subject() {
  const [currentSubject, setCurrentSubject] = useState<any>();
  const location = useLocation();

  const { chosenSubject } = location.state as {
    chosenSubject: string;
  };

  useEffect(() => {
    const foundSubject = subjects.find((item) => item?.title === chosenSubject);
    setCurrentSubject(foundSubject);
  }, [chosenSubject]);

  const handleSubjectChange = (subject: any) => {
    setCurrentSubject(subject);
  };

  const handleChosenTopic = () => {};

  return (
    <view className="flex flex-col gap-10 justify-center items-center">
      <scroll-view
        className={'w-[350px] flex justify-between items-center'}
        scroll-orientation="horizontal"
      >
        {subjects.map((subject, index) => (
          <text
            key={index}
            className={`text-lg py-1  ${currentSubject?.title === subject?.title ? 'text-[#ed7d2d] font-bold border-b-4 border-[#ed7d2d]' : 'text-[#9095a0]'}`}
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
            onTap={handleChosenTopic}
          />
        ))}
      </scroll-view>
    </view>
  );
}
