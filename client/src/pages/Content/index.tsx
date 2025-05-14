import { useLocation, useNavigate } from 'react-router';
import { useQuiz } from '../../hooks/useQuiz.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useMemo, useState } from 'react';
import {
  QuestionType,
  SHOWN_NODES,
  SubjectColors,
  SubjectTitle,
} from '../../constants/subject.js';
import StepsIndicator from '../../components/StepsIndicator.jsx';
import icons from '../../constants/icons.js';
import { STYLES } from './styles.js';
import Button from '../../components/Button/Button.jsx';
import type { AcademicStatus } from '../../types/types.js';
import LessonView from '../../components/LessonView.jsx';
import QuizView from '../../components/QuizView.jsx';
// import { LynxRenderer } from '../../utils/LynxParser/lynxRenderer.jsx';
// import { useParsedLynx } from '../../hooks/useParser.jsx';

export default function Content() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const {
    content,
    academicStatus,
    title,
    figures,
    type,
    attribution,
    parent,
  }: {
    content: any;
    academicStatus: AcademicStatus;
    title: string;
    figures: any[];
    type: 'quiz' | 'lesson';
    attribution?: string;
    parent?: any;
  } = location.state;

  const {
    current,
    sequence,
    steps,
    anim,
    selectedChoice,
    items,
    selectedId,
    setSelectedId,
    selectChoice,
    confirmSequence,
    moveUp,
    moveDown,
    finish,
    handleCardPress,
  } = useQuiz({ content, academicStatus, type });

  const navigation = useNavigate();

  const [currentParagraphs, setCurrentParagraphs] = useState<any[]>([
    ...(content?.paragraph ?? []),
  ]);

  // Create step colors mapping
  const stepColorMap = useMemo(() => {
    const colorMap: Record<string, string> = {};
    if (type === 'lesson') {
      currentParagraphs.forEach((item: any) => {
        colorMap[item.id] =
          SubjectColors[parent?.sub as keyof typeof SubjectColors];
      });
    } else {
      items.forEach((item: any) => {
        colorMap[item.id] =
          SubjectColors[item.subject as keyof typeof SubjectColors];
      });
    }
    return colorMap;
  }, [currentParagraphs, parent, items, type]);

  const lessonSteps = useMemo(
    () =>
      currentParagraphs.map((q: any, i: number) => ({
        id: q.id,
        label: `P${i + 1}`,
        data: q,
      })),
    [currentParagraphs],
  );

  const [currentPage, setCurrentPage] = useState(0);
  const totalSteps = type === 'quiz' ? steps.length : content?.paragraph.length;

  const handleNextPage = () => {
    if (currentPage < totalSteps - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
      setCurrentParagraphs((prevParagraphs) => {
        return prevParagraphs.slice(1);
      });
    } else {
      navigation(-1);
    }
  };

  function parseParagraphWithImages(text: string, figures: any[] = []) {
    const regex = /<([^>]+)>/g;
    const parts: (string | JSX.Element)[] = [];

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const id = match[1];
      const start = match.index;
      const end = regex.lastIndex;

      // Push text before the placeholder
      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start));
      }

      // Find corresponding image
      const figure = figures.find((f) => f.id === id);
      if (figure) {
        parts.push(
          <image
            key={id}
            src={figure.image}
            className={`rounded-lg w-full h-[150px] h-[${figure.height}]`}
          />,
        );
      }

      lastIndex = end;
    }

    // Push remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }

  return (
    <view
      className={`${STYLES.container} ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-neutral-100'}`}
    >
      <StepsIndicator
        steps={type === 'lesson' ? lessonSteps : steps}
        currentStep={0} // Show current page for lessons
        maxVisibleSteps={SHOWN_NODES}
        showBackButton={true}
        backIcon={icons.closebtn}
        onBackPress={() => navigation(-1)}
        stepColors={stepColorMap}
        showCursor={true}
        showLabels={false}
        activeColor={
          current?.subject
            ? SubjectColors[current?.subject as keyof typeof SubjectColors]
            : '#ed7d2d'
        }
      />

      {anim?.direction && (
        <view
          className={`${STYLES.feedbackOverlay} ${
            anim.direction === 'right'
              ? STYLES.correctFeedback
              : STYLES.incorrectFeedback
          }`}
        >
          <text className={STYLES.feedbackText}>
            {anim.direction === 'right' ? 'Correct!' : 'Incorrect'}
          </text>
        </view>
      )}
      <view
        className={`${STYLES.questionCard} ${
          theme === 'dark'
            ? 'bg-[#2a2a2a] border-[#333333]'
            : 'bg-white border-[#dee1e6]'
        } relative overflow-hidden ${anim?.direction && 'translate-x-full'}`}
      >
        {/* Question Display */}
        {items.length > 0 && type === 'quiz' ? (
          <QuizView
            current={current}
            sequence={sequence}
            selectedChoice={selectedChoice}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            selectChoice={selectChoice}
            confirmSequence={confirmSequence}
            moveUp={moveUp}
            moveDown={moveDown}
            finish={finish}
            handleCardPress={handleCardPress}
            theme={theme}
            anim={anim}
          />
        ) : (
          type === 'lesson' && (
            <LessonView
              paragraphs={currentParagraphs}
              figures={figures}
              theme={theme}
              title={title}
              currentPage={currentPage}
              totalSteps={totalSteps}
              attribution={attribution}
              parent={parent}
              parseParagraphWithImages={parseParagraphWithImages}
              handleNextPage={handleNextPage}
            />
          )
        )}
      </view>

      {/* Footer */}
      <view className={STYLES.bottomBar}>
        <Button
          textStyle={` ${theme === 'dark' ? 'text-black' : 'text-white'}`}
          className={`${STYLES.actionButton} opacity-30`}
          disabled={true}
          icon={<image src={icons.edit2} className="w-5 h-5" />}
          variant="plain"
        />
        <Button
          textStyle="text-white"
          className={`${STYLES.actionButton} opacity-30`}
          icon={<image src={icons.bug} className="w-5 h-5" />}
          disabled={true}
          variant="plain"
        />
        <Button
          textStyle={` ${theme === 'dark' ? 'text-black' : 'text-white'}`}
          className={`${STYLES.actionButton} bg-white`}
          variant="plain"
          icon={
            <image
              src={theme === 'dark' ? icons.day : icons.night}
              className="w-5 h-5"
            />
          }
          onTap={toggleTheme}
        />
        <Button
          textStyle="text-white"
          className={`${STYLES.actionButton} opacity-30`}
          disabled={true}
          icon={<image src={icons.book} className="w-5 h-5" />}
          variant="plain"
        />
      </view>
    </view>
  );
}
