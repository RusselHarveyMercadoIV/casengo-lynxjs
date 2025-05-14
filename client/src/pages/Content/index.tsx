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
          <>
            {!anim?.showingBack ? (
              <>
                <view className={STYLES.questionContainer}>
                  <view
                    className={
                      'absolute top-[-30px] right-2 bg-[#eefdf3] py-2 px-6 rounded-full'
                    }
                  >
                    <text className="text-[#117b34]">
                      {current?.difficulty}
                    </text>
                  </view>
                  <text
                    className={`${STYLES.questionText} ${
                      theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
                    }`}
                  >
                    {current?.question}
                  </text>
                  <view className={STYLES.choicesContainer}>
                    {current?.type === 'sequencing' ? (
                      <view className="flex flex-col h-full justify-center">
                        <text
                          className={`${STYLES.sequenceInstructions} ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          (Arrange these steps in the correct order)
                        </text>
                        <scroll-view
                          scroll-orientation="vertical"
                          className="flex flex-col h-[350px]"
                          style={{ gap: '10px' }}
                          scroll-bar-enable={true}
                        >
                          {sequence.map((item, index) => (
                            <view
                              key={item.id}
                              className={`${STYLES.sequenceItem} ${
                                selectedId === item.id
                                  ? `${STYLES.activeSequenceItem} ${
                                      theme === 'dark'
                                        ? 'bg-[#3a3a3a] border-[#ed7d2d]'
                                        : 'bg-[#fff3ea] border-[#ed7d2d]'
                                    }`
                                  : `${STYLES.inactiveSequenceItem} ${
                                      theme === 'dark'
                                        ? 'border-[#333333]'
                                        : 'border-[#dee1e6]'
                                    }`
                              }`}
                              bindtap={() => setSelectedId(item.id)}
                            >
                              <text
                                className={`${STYLES.sequenceText} ${
                                  theme === 'dark'
                                    ? 'text-white'
                                    : 'text-[#565e6c]'
                                }`}
                              >
                                {item.text}
                              </text>
                              <view className={STYLES.sequenceControls}>
                                <view
                                  className={`${STYLES.sequenceButton} ${
                                    theme === 'dark'
                                      ? 'bg-[#3a3a3a]'
                                      : 'bg-[#f3f4f6]'
                                  }`}
                                  bindtap={() => moveUp(index)}
                                >
                                  <text
                                    className={
                                      theme === 'dark'
                                        ? 'text-white'
                                        : 'text-[#565e6c]'
                                    }
                                  >
                                    ↑
                                  </text>
                                </view>
                                <view
                                  className={`${STYLES.sequenceButton} ${
                                    theme === 'dark'
                                      ? 'bg-[#3a3a3a]'
                                      : 'bg-[#f3f4f6]'
                                  }`}
                                  bindtap={() => moveDown(index)}
                                >
                                  <text
                                    className={
                                      theme === 'dark'
                                        ? 'text-white'
                                        : 'text-[#565e6c]'
                                    }
                                  >
                                    ↓
                                  </text>
                                </view>
                              </view>
                            </view>
                          ))}
                        </scroll-view>
                      </view>
                    ) : current?.type === 'fillInTheBlank' ? (
                      <view className="flex flex-col h-full justify-center">
                        {/* Add fill-in-the-blank logic if needed */}
                      </view>
                    ) : (
                      <view className="flex flex-col h-full justify-center">
                        <scroll-view
                          scroll-orientation="vertical"
                          className="flex flex-col h-[370px]"
                          style={{ gap: '10px' }}
                          scroll-bar-enable={true}
                        >
                          {current?.choices?.map(
                            (choice: string, index: number) => (
                              <Button
                                key={index}
                                textStyle="text-[#9095a0]"
                                className={`${
                                  selectedChoice === index
                                    ? `${STYLES.selectedChoiceButton} ${
                                        theme === 'dark'
                                          ? 'bg-[#3a3a3a] border-[#ed7d2d]'
                                          : 'bg-[#fff3ea] border-[#ed7d2d]'
                                      }`
                                    : `${STYLES.choiceButton} ${
                                        theme === 'dark'
                                          ? 'bg-[#2a2a2a]'
                                          : 'bg-white'
                                      }`
                                } my-2`}
                                variant="plain"
                                text={choice}
                                onTap={() => selectChoice(choice, index)}
                              />
                            ),
                          )}
                          <Button
                            className={`${STYLES.choiceButton} ${
                              selectedChoice === current?.choices?.length
                                ? `${STYLES.selectedChoiceButton} ${
                                    theme === 'dark'
                                      ? 'bg-[#3a3a3a] border-[#ed7d2d]'
                                      : 'bg-[#fff3ea] border-[#ed7d2d]'
                                  }`
                                : `${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'}`
                            } my-2`}
                            textStyle="text-[#9095a0]"
                            variant="plain"
                            text="I don't know"
                            onTap={() =>
                              selectChoice(
                                "I don't know",
                                current?.choices?.length ?? 0,
                              )
                            }
                          />
                        </scroll-view>
                      </view>
                    )}
                  </view>
                </view>

                <view className="flex flex-col items-center w-[300px] flex-none pt-4">
                  {current?.type !== 'multipleChoices' &&
                    current?.type !== 'caseBased' && (
                      <view className={STYLES.buttonContainer}>
                        <Button
                          className={`${STYLES.dontKnowButton} ${
                            theme === 'dark' ? 'bg-[#3a3a3a]' : 'bg-[#f3f4f6]'
                          }`}
                          variant="plain"
                          text="I don't know"
                          onTap={() => finish(false, "I don't know")}
                        />
                        <Button
                          className={`${STYLES.confirmButton} ${
                            theme === 'dark'
                              ? 'bg-[#ed7d2d]'
                              : 'border-[#ed7d2d]'
                          }`}
                          variant="plain"
                          text="Confirm"
                          onTap={confirmSequence}
                        />
                      </view>
                    )}
                  <view
                    className={`${STYLES.footer} ${
                      theme === 'dark' ? 'border-[#333333]' : 'border-[#bcc1ca]'
                    }`}
                  >
                    <text
                      className={`${STYLES.footerText} ${
                        theme === 'dark' ? 'text-gray-400' : 'text-[#bcc1ca]'
                      }`}
                    >
                      {current?.type
                        ? QuestionType[
                            current.type as keyof typeof QuestionType
                          ]
                        : ''}
                    </text>
                    <text
                      className={`${STYLES.footerText} ${
                        theme === 'dark' ? 'text-gray-400' : 'text-[#bcc1ca]'
                      }`}
                    >
                      {current?.subject
                        ? SubjectTitle[
                            current.subject as keyof typeof SubjectColors
                          ]
                        : ''}
                    </text>
                  </view>
                </view>
              </>
            ) : (
              <view
                className="flex flex-col h-full items-center justify-between px-8"
                bindtap={handleCardPress}
              >
                <view className="flex flex-col gap-5">
                  <text
                    className={`text-2xl text-clip font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  >
                    Rationale
                  </text>
                  <text
                    className={`text-xl ${
                      theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
                    }`}
                  >
                    {current?.rationale}
                  </text>
                </view>
                <text
                  className={` ${
                    theme === 'dark' ? 'text-[#ffffff7e]' : 'text-[#0000002f]'
                  }`}
                >
                  tap to continue
                </text>
              </view>
            )}
          </>
        ) : (
          type === 'lesson' && (
            <view className="flex flex-col justify-center items-center gap-2 px-8 w-full h-full">
              <scroll-view
                scroll-orientation="vertical"
                className="flex flex-col h-full w-full"
              >
                <view className="flex flex-col gap-2 justify-center items-center mb-10">
                  <text className="text-xl text-[#ed7d2d] font-extrabold">
                    {parent?.re}
                  </text>
                  <text
                    className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
                    }`}
                  >
                    {title}
                  </text>
                  <text
                    className={`text-xl ${
                      theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
                    }`}
                  >
                    {currentPage + 1} / {totalSteps}
                  </text>
                </view>
                <view className="text-xl leading-relaxed flex flex-col gap-4">
                  {parseParagraphWithImages(
                    currentParagraphs[0]?.text,
                    figures,
                  ).map((part, index) =>
                    typeof part === 'string' ? (
                      <text
                        key={index}
                        className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-[#9095a0]'}`}
                      >
                        {part}
                      </text>
                    ) : (
                      part
                    ),
                  )}
                </view>
                <Button
                  className={`self-end mt-10 w-1/2 ${STYLES.confirmButton} ${
                    theme === 'dark' ? 'bg-[#ed7d2d]' : 'border-[#ed7d2d]'
                  }`}
                  variant="plain"
                  text="Continue"
                  onTap={handleNextPage}
                />
              </scroll-view>
              <text
                className={`text-md py-2 ${
                  theme === 'dark' ? 'text-[#ffffff7e]' : 'text-[#0000002f]'
                }`}
              >
                {attribution}
              </text>
            </view>
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
