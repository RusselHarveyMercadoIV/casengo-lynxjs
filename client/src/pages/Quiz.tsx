import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Button from '../components/Button/Button.jsx';
import icons from '../constants/icons.js';
import type { SelectedQuestion } from '../types/types.js';
import StepsIndicator, { type Step } from '../components/StepsIndicator.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const SHOWN_NODES = 16;

// Define a type for sequence items
type SequenceItem = {
  id: string;
  text: string;
};

export default function Quiz() {
  const { theme, toggleTheme } = useTheme();
  const [items, setItems] = useState<SelectedQuestion[]>([]);
  const [sequenceOrder, setSequenceOrder] = useState<SequenceItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBackCard, setShowBackCard] = useState(false);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    null,
  );

  const navigation = useNavigate();
  const location = useLocation();

  //state
  const { questions, academicStatus, type } = location.state as {
    questions: any;
    academicStatus: string;
    type: string;
  };

  const [userAnswers, setUserAnswers] = useState<
    { question: SelectedQuestion; userAnswer: any; isCorrect: boolean }[]
  >([]);

  const SubjectColors = {
    anatomyAndPhysiology: '#ed7d2d',
    microbiology: '#8353e2',
    fundamentalsOfNursing: '#1dd75b',
    pharmacology: '#676767',
    communityHealthNursing: '#379ae6',
    maternalAndChildHealthNursing: '#de3b40',
    medicalSurgicalNursing: '#00bdd6',
    psychiatricNursing: '#efb034',
  } as const;

  const QuestionType = {
    multipleChoices: 'Multiple choices',
    caseBased: 'Case based',
    sata: 'SATA',
    sequencing: 'Sequencing',
    fillInTheBlank: 'Fill in the blank',
  } as const;

  const SubjectTitle = {
    anatomyAndPhysiology: 'Anatomy & Physiology',
    microbiology: 'Microbiology',
    fundamentalsOfNursing: 'Fundamentals of Nursing',
    pharmacology: 'Pharmacology',
    communityHealthNursing: 'Community Health Nursing',
    maternalAndChildHealthNursing: 'Maternal & Child Health Nursing',
    medicalSurgicalNursing: 'Medical Surgical Nursing',
    psychiatricNursing: 'Psychiatric Nursing',
  } as const;

  const handleFinishQuestion = (isCorrect: boolean, userAnswer: any) => {
    if (currentItem) {
      setUserAnswers((prev) => [
        ...prev,
        { question: currentItem, userAnswer, isCorrect },
      ]);
    }

    setShowBackCard(true);
    setIsAnimating(true);
    setSlideDirection(isCorrect ? 'right' : 'left');

    setTimeout(() => {
      // setItems((prevItems) => {
      //   const remainingItems = prevItems.slice(1);
      //   // if (remainingItems.length === 0 && type === 'diagnostic') {
      //   //   navigation('/diagnostic-result', { state: { userAnswers } });
      //   // }
      //   return remainingItems;
      // });
      setIsAnimating(false);
      setSlideDirection(null);
      setSelectedChoiceIndex(null);
    }, 500);
  };

  const handleCardPress = () => {
    setItems((prevItems) => {
      const remainingItems = prevItems.slice(1);
      if (remainingItems.length === 0 && type === 'diagnostic') {
        navigation('/diagnostic-result', { state: { userAnswers } });
      }
      return remainingItems;
    });
    setShowBackCard(false);
  };

  const handleChoiceSelection = (choice: string, index: number) => {
    if (currentItem) {
      setSelectedChoiceIndex(index);

      if (Array.isArray(currentItem.answer)) {
        setTimeout(() => {
          handleFinishQuestion(false, null);
        }, 700);
        return;
      }

      let answer = '';
      if (currentItem.answer.length === 1) {
        answer = currentItem.answer[0] as string;
      }

      const isLetterAnswer = /^[A-Za-z]$/.test(answer);

      let isCorrect = false;
      let userAnswer: string;

      if (choice === "I don't know") {
        isCorrect = false;
        userAnswer = "I don't know";
      } else if (isLetterAnswer) {
        userAnswer = String.fromCharCode(65 + index);
        isCorrect = userAnswer === answer.toUpperCase();
      } else {
        userAnswer = choice;
        isCorrect = choice === answer;
      }

      setTimeout(() => {
        handleFinishQuestion(isCorrect, userAnswer);
      }, 50);
    }
  };

  const handleConfirm = () => {
    if (
      currentItem &&
      currentItem.type === 'sequencing' &&
      currentItem.choices !== null
    ) {
      const currentSequence = sequenceOrder.map((item) => {
        const originalIndex = currentItem?.choices?.findIndex(
          (choice) => choice === item.text,
        );
        return String.fromCharCode(97 + originalIndex!);
      });

      const isCorrect =
        JSON.stringify(currentSequence) === JSON.stringify(currentItem.answer);

      handleFinishQuestion(isCorrect, currentSequence);
    } else {
      handleFinishQuestion(false, null);
    }
  };

  // Functions to move items up and down in the sequence
  const moveItemUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...sequenceOrder];
      const temp = newOrder[index];
      newOrder[index] = newOrder[index - 1];
      newOrder[index - 1] = temp;
      setSequenceOrder(newOrder);
    }
  };

  const moveItemDown = (index: number) => {
    if (index < sequenceOrder.length - 1) {
      const newOrder = [...sequenceOrder];
      const temp = newOrder[index];
      newOrder[index] = newOrder[index + 1];
      newOrder[index + 1] = temp;
      setSequenceOrder(newOrder);
    }
  };

  useEffect(() => {
    const level = questions[academicStatus];
    const allQuestions: SelectedQuestion[] = [];

    Object.keys(level).forEach((subject) => {
      const sub = level[subject];
      Object.keys(sub).forEach((diff) => {
        const currentDifficulty = sub[diff];
        Object.keys(currentDifficulty).forEach((category) => {
          const questionsArray = currentDifficulty[category];
          if (questionsArray && Array.isArray(questionsArray)) {
            questionsArray.forEach((question) => {
              const choicesArray =
                question?.choices && Object.values(question?.choices);
              allQuestions.push({
                id: question.id,
                question: question.question,
                choices: (choicesArray as string[]) ?? null,
                answer: question.answer,
                rationale: question.rationale,
                keyPhrases: question.keyPhrases,
                type: category as
                  | 'multipleChoices'
                  | 'sata'
                  | 'caseBased'
                  | 'sequencing'
                  | 'fillInTheBlank',
                subject,
                difficulty: diff as 'easy' | 'medium' | 'hard',
              });
            });
          }
        });
      });
    });

    setItems(allQuestions);
  }, [questions, academicStatus]);

  const currentItem = items[0];

  // Initialize sequenceOrder when a new sequencing question is displayed
  useEffect(() => {
    if (
      currentItem &&
      currentItem.type === 'sequencing' &&
      currentItem.choices !== null
    ) {
      const initialSequence = currentItem?.choices?.map(
        (choice: string, index: number) => ({
          id: `${currentItem.id}-${index}`,
          text: choice,
        }),
      );
      setSequenceOrder(initialSequence!);
      setSelectedId(null);
    }
  }, [currentItem]);

  // Create steps array for StepsIndicator from the items
  const quizSteps = useMemo(() => {
    return items.map((item, index) => ({
      id: item.id || `item-${index}`,
      label: `Question ${index + 1}`,
      completed: false, // We don't track completion in the quiz flow
      data: item,
    }));
  }, [items]);

  // Create step colors mapping
  const stepColorMap = useMemo(() => {
    const colorMap: Record<string, string> = {};

    items.forEach((item) => {
      if (item.id) {
        colorMap[item.id] =
          SubjectColors[item.subject as keyof typeof SubjectColors];
      }
    });

    return colorMap;
  }, [items]);

  return (
    <view
      className={`${STYLES.container} ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-neutral-100'}`}
    >
      {/* Header with StepsIndicator */}
      <StepsIndicator
        steps={quizSteps}
        currentStep={0} // Always show first step as current in the quiz
        maxVisibleSteps={SHOWN_NODES}
        showBackButton={true}
        backIcon={icons.closebtn}
        onBackPress={() => navigation(-1)}
        stepColors={stepColorMap}
        showCursor={true}
        showLabels={false}
        activeColor={
          items[0]?.subject
            ? SubjectColors[items[0]?.subject as keyof typeof SubjectColors]
            : '#ed7d2d'
        }
      />

      {isAnimating && (
        <view
          className={`${STYLES.feedbackOverlay} ${
            slideDirection === 'right'
              ? STYLES.correctFeedback
              : STYLES.incorrectFeedback
          }`}
        >
          <text className={STYLES.feedbackText}>
            {slideDirection === 'right' ? 'Correct!' : 'Incorrect'}
          </text>
        </view>
      )}
      {/* Question Display */}
      {items.length > 0 && currentItem && (
        <view
          className={`${STYLES.questionCard} ${
            theme === 'dark'
              ? 'bg-[#2a2a2a] border-[#333333]'
              : 'bg-white border-[#dee1e6]'
          } relative overflow-hidden ${isAnimating && 'translate-x-full'}`}
        >
          {!showBackCard ? (
            <>
              <view className={STYLES.questionContainer}>
                <view
                  className={
                    'absolute top-[-30px] right-2 bg-[#eefdf3] py-2 px-6 rounded-full'
                  }
                >
                  <text className=" text-[#117b34]">
                    {currentItem.difficulty}
                  </text>
                </view>
                <text
                  className={`${STYLES.questionText} ${
                    theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
                  }`}
                >
                  {currentItem.question}
                </text>
                <view className={STYLES.choicesContainer}>
                  {currentItem.type === 'sequencing' ? (
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
                        {sequenceOrder.map((item, index) => (
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
                                bindtap={() => moveItemUp(index)}
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
                                bindtap={() => moveItemDown(index)}
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
                  ) : currentItem.type === 'fillInTheBlank' ? (
                    <view className="flex flex-col h-full justify-center"></view>
                  ) : (
                    <view className="flex flex-col h-full justify-center">
                      <scroll-view
                        scroll-orientation="vertical"
                        className="flex flex-col h-[370px]"
                        style={{ gap: '10px' }}
                        scroll-bar-enable={true}
                      >
                        {currentItem?.choices?.map(
                          (choice: string, index: number) => (
                            <Button
                              key={index}
                              textStyle="text-[#9095a0]"
                              className={`${
                                selectedChoiceIndex === index
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
                              onTap={() => handleChoiceSelection(choice, index)}
                            />
                          ),
                        )}
                        <Button
                          className={`${STYLES.choiceButton} ${
                            selectedChoiceIndex === currentItem?.choices?.length
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
                            handleChoiceSelection(
                              "I don't know",
                              currentItem?.choices?.length!,
                            )
                          }
                        />
                      </scroll-view>
                    </view>
                  )}
                </view>
              </view>

              <view className="flex flex-col items-center w-[300px] flex-none pt-4">
                {currentItem.type !== 'multipleChoices' &&
                  currentItem.type !== 'caseBased' && (
                    <view className={STYLES.buttonContainer}>
                      <Button
                        className={`${STYLES.dontKnowButton} ${
                          theme === 'dark' ? 'bg-[#3a3a3a]' : 'bg-[#f3f4f6]'
                        }`}
                        variant="plain"
                        text="I don't know"
                        onTap={() =>
                          handleFinishQuestion(false, "I don't know")
                        }
                      />
                      <Button
                        className={`${STYLES.confirmButton} ${
                          theme === 'dark' ? 'bg-[#ed7d2d]' : 'border-[#ed7d2d]'
                        }`}
                        variant="plain"
                        text="Confirm"
                        onTap={handleConfirm}
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
                    {
                      QuestionType[
                        currentItem.type as keyof typeof QuestionType
                      ]
                    }
                  </text>
                  <text
                    className={`${STYLES.footerText} ${
                      theme === 'dark' ? 'text-gray-400' : 'text-[#bcc1ca]'
                    }`}
                  >
                    {
                      SubjectTitle[
                        currentItem.subject as keyof typeof SubjectColors
                      ]
                    }
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
                  {currentItem.rationale}
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
        </view>
      )}
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
          textStyle={` text-white`}
          className={`${STYLES.actionButton} opacity-30`}
          icon={<image src={icons.bug} className="w-5 h-5" />}
          disabled={true}
          variant="plain"
        />
        <Button
          textStyle={` ${theme === 'dark' ? 'text-black' : 'text-white'}`}
          className={`${STYLES.actionButton} ${'bg-white'}`}
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
          textStyle={` text-white`}
          className={`${STYLES.actionButton} opacity-30`}
          disabled={true}
          icon={<image src={icons.book} className="w-5 h-5" />}
          variant="plain"
        />
      </view>
    </view>
  );
}

// Styles
const STYLES = {
  container: 'flex flex-col items-center h-full pt-10',
  header: 'flex w-[340px] flex-row justify-center items-center',
  backButton: 'absolute left-0 w-[20px] h-[20px]',
  progressContainer: 'w-[270px] ml-10 h-[20px]',
  cursor: 'w-[10px] h-[10px] left-[-2.5px] top-[22px] absolute',
  progressBar: 'flex flex-row gap-1 items-center h-full w-full overflow-hidden',
  progressDot: 'w-[6px] h-[12px] rounded-full opacity-50',
  remainingCount: 'text-sm text-[#ed7d2d]',
  questionCard:
    'flex flex-col justify-between py-8 pt-12 border-2 items-center  w-[370px] h-[675px] mt-4 mb-3 rounded-[2rem] transition-transform duration-300 ease-in-out',
  questionContainer: 'flex flex-col flex-1 px-8 w-[350px] relative',
  questionText: 'text-3xl text-clip mb-4 font-semibold',
  choicesContainer: 'h-[350px] grow justify-center',
  choiceButton: 'py-6 px-4 rounded-xl w-full ',
  selectedChoiceButton: 'py-6 px-4 rounded-xl w-full border',
  choiceText: 'text-lg text-center ',
  sequenceItem: 'py-6 px-4 my-[5px] rounded-[8px] flex flex-row items-center',
  sequenceText: 'text-lg flex-1 text-[#9095a0]',
  sequenceControls: 'flex flex-row gap-2',
  sequenceButton: 'w-8 h-8 flex items-center justify-center rounded-full',
  activeSequenceItem: 'border',
  inactiveSequenceItem: 'border border-2',
  sequenceInstructions: 'text-sm mb-2',
  buttonContainer: 'flex gap-10 flex-row mb-10',
  dontKnowButton: 'px-6 py-5 rounded-2xl',
  dontKnowText: 'text-xl',
  confirmButton: 'border border-1 px-6 py-5 rounded-2xl',
  confirmText: 'text-xl',
  footer: 'w-full flex flex-row justify-between items-center border-t pt-2',
  footerText: 'text-sm',
  bottomBar: 'flex flex-row justify-around w-[350px] opacity-90',
  actionButton: 'px-5 py-3 rounded-2xl',
  actionText: 'text-md text-white',
  feedbackOverlay:
    'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-opacity-90',
  feedbackText: 'text-5xl font-bold text-white feedback-scale',
  correctFeedback: 'bg-[#1dd75b]',
  incorrectFeedback: 'bg-[#de3b40]',
} as const;
