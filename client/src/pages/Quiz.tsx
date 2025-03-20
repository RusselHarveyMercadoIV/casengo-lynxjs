import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Button from '../components/Button/Button.jsx';
import icons from '../constants/icons.js';
import type { SelectedQuestion, SubjectColorsType } from '../types/types.js';
import Separator from '../components/Separator.jsx';
import StepsIndicator, { type Step } from '../components/StepsIndicator.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const SHOWN_NODES = 16;

// Define a type for sequence items
type SequenceItem = {
  id: string;
  text: string;
};

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
    'flex flex-col justify-between py-8 pt-12 border-2 items-center w-[370px] h-[665px] mt-4 mb-3 rounded-[2rem] transition-transform duration-300 ease-in-out',
  questionContainer: 'flex flex-col flex-1 px-8 w-[350px] relative',
  questionText: 'text-2xl text-clip mb-4',
  choicesContainer: 'h-[350px] grow justify-center',
  choiceButton: 'py-6 px-4 rounded-xl w-full',
  selectedChoiceButton: 'py-6 px-4 rounded-xl w-full border',
  choiceText: 'text-lg text-center',
  sequenceItem: 'py-6 px-4 my-[5px] rounded-[8px] flex flex-row items-center',
  sequenceText: 'text-lg flex-1',
  sequenceControls: 'flex flex-row gap-2',
  sequenceButton: 'w-8 h-8 flex items-center justify-center rounded-full',
  activeSequenceItem: 'border',
  inactiveSequenceItem: 'border border-2',
  sequenceInstructions: 'text-sm mt-2',
  buttonContainer: 'flex gap-10 flex-row mb-10',
  dontKnowButton: 'px-6 py-5 rounded-2xl',
  dontKnowText: 'text-xl',
  confirmButton: 'border border-1 px-6 py-5 rounded-2xl',
  confirmText: 'text-xl',
  footer: 'w-full flex flex-row justify-between items-center border-t pt-2',
  footerText: 'text-sm',
  bottomBar: 'flex flex-row justify-around w-[350px] opacity-70',
  actionButton: 'px-5 py-3 rounded-2xl',
  actionText: 'text-md text-white',
  feedbackOverlay:
    'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-opacity-90',
  feedbackText: 'text-5xl font-bold text-white feedback-scale',
  correctFeedback: 'bg-[#1dd75b]',
  incorrectFeedback: 'bg-[#de3b40]',
} as const;

export default function Quiz() {
  const { theme, toggleTheme } = useTheme();
  const [items, setItems] = useState<SelectedQuestion[]>([]);
  const [sequenceOrder, setSequenceOrder] = useState<SequenceItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    null,
  );

  const navigation = useNavigate();
  const location = useLocation();
  const { questions, academicStatus } = location.state as {
    questions: any;
    academicStatus: string;
  };

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

  const handleFinishQuestion = (isCorrect: boolean = false) => {
    setIsAnimating(true);
    setSlideDirection(isCorrect ? 'right' : 'left');

    // Wait for animation to complete before moving to next question
    setTimeout(() => {
      setItems((prevItems) => prevItems.slice(1));
      setIsAnimating(false);
      setSlideDirection(null);
      setSelectedChoiceIndex(null);
    }, 500); // Match this with the CSS transition duration
  };

  // Handler for the Confirm button to check the sequence
  const handleConfirm = () => {
    if (currentItem && currentItem.type === 'sequencing') {
      // Convert current sequence order to array of letters (a, b, c, d, etc.)
      const currentSequence = sequenceOrder.map((item, index) => {
        // Find the original choice index that matches this item's text
        const originalIndex = currentItem.choices.findIndex(
          (choice) => choice === item.text,
        );
        // Convert index to letter (0=a, 1=b, etc.)
        return String.fromCharCode(97 + originalIndex); // 97 is ASCII for 'a'
      });

      // Compare with the correct answer array
      const isCorrect =
        JSON.stringify(currentSequence) === JSON.stringify(currentItem.answer);
      handleFinishQuestion(isCorrect);
    } else {
      handleFinishQuestion();
    }
  };

  // Handler for checking if a multiple choice answer is correct
  const handleChoiceSelection = (choice: string, index: number) => {
    if (currentItem) {
      // Highlight the selected choice first
      setSelectedChoiceIndex(index);

      // Handle different answer types (string or string[])
      if (Array.isArray(currentItem.answer)) {
        // For SATA or other multiple answer questions
        // Not implemented in this version - just move to next question
        setTimeout(() => handleFinishQuestion(false), 700);
        return;
      }

      // Now we know currentItem.answer is a string
      const answer = currentItem.answer as string;

      // Check if the answer is a letter (A, B, C, D, etc.)
      const isLetterAnswer = /^[A-Za-z]$/.test(answer);

      let isCorrect = false;
      if (isLetterAnswer) {
        // If answer is a letter, convert index to corresponding letter (0=A, 1=B, etc.)
        const answerLetter = String.fromCharCode(65 + index); // 65 is ASCII for 'A'
        isCorrect = answerLetter === answer.toUpperCase();
      } else {
        // Direct text comparison if answer is the full text
        isCorrect = choice === answer;
      }

      // Show feedback after a delay to give user time to see the highlighted selection
      setTimeout(() => handleFinishQuestion(isCorrect), 100);
    } else {
      setTimeout(() => handleFinishQuestion(false), 700);
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
              const choicesArray = Object.values(question.choices);
              allQuestions.push({
                id: question.id,
                question: question.question,
                choices: choicesArray as string[],
                answer: question.answer,
                type: category as
                  | 'multipleChoices'
                  | 'sata'
                  | 'caseBased'
                  | 'sequencing',
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
    if (currentItem && currentItem.type === 'sequencing') {
      const initialSequence = currentItem.choices.map(
        (choice: string, index: number) => ({
          id: `${currentItem.id}-${index}`,
          text: choice,
        }),
      );
      setSequenceOrder(initialSequence);
      setSelectedId(null);
    }
  }, [currentItem]);

  const total = items.length - SHOWN_NODES;

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
      className={`${STYLES.container} ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}
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
            ? SubjectColors[items[0].subject as keyof typeof SubjectColors]
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
          <view className={STYLES.questionContainer}>
            <text
              className={`${STYLES.questionText} ${
                theme === 'dark' ? 'text-white' : 'text-[#323842]'
              }`}
            >
              {currentItem.question}
            </text>
            <view className={STYLES.choicesContainer}>
              {currentItem.type === 'sequencing' ? (
                <view className="flex flex-col h-full justify-center">
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
                            theme === 'dark' ? 'text-white' : 'text-[#565e6c]'
                          }`}
                        >
                          {item.text}
                        </text>
                        <view className={STYLES.sequenceControls}>
                          <view
                            className={`${STYLES.sequenceButton} ${
                              theme === 'dark' ? 'bg-[#3a3a3a]' : 'bg-[#f3f4f6]'
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
                              theme === 'dark' ? 'bg-[#3a3a3a]' : 'bg-[#f3f4f6]'
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
                  <text
                    className={`${STYLES.sequenceInstructions} ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    (Arrange these steps in the correct order)
                  </text>
                </view>
              ) : (
                <view className="flex flex-col h-full justify-center">
                  <scroll-view
                    scroll-orientation="vertical"
                    className="flex flex-col h-[350px]"
                    style={{ gap: '10px' }}
                    scroll-bar-enable={true}
                  >
                    {currentItem.choices.map(
                      (choice: string, index: number) => (
                        <Button
                          key={index}
                          className={`${
                            selectedChoiceIndex === index
                              ? `${STYLES.selectedChoiceButton} ${
                                  theme === 'dark'
                                    ? 'bg-[#3a3a3a] border-[#ed7d2d]'
                                    : 'bg-[#fff3ea] border-[#ed7d2d]'
                                }`
                              : `${STYLES.choiceButton} ${
                                  theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
                                }`
                          } my-2`}
                          variant="plain"
                          text={choice}
                          onTap={() => handleChoiceSelection(choice, index)}
                        />
                      ),
                    )}
                  </scroll-view>
                </view>
              )}
            </view>
          </view>

          <view className="flex flex-col items-center w-[300px] flex-none pt-4">
            {currentItem.type !== 'multipleChoices' && (
              <view className={STYLES.buttonContainer}>
                <Button
                  className={`${STYLES.dontKnowButton} ${
                    theme === 'dark' ? 'bg-[#3a3a3a]' : 'bg-[#f3f4f6]'
                  }`}
                  variant="plain"
                  text="I don't know"
                  onTap={handleFinishQuestion}
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
                {QuestionType[currentItem.type as keyof typeof QuestionType]}
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
        </view>
      )}
      {/* Footer */}
      <view className={STYLES.bottomBar}>
        <Button
          className={`${STYLES.actionButton} bg-[#ed7d2d]`}
          variant="plain"
          text="Suggest"
        />
        <Button
          className={`${STYLES.actionButton} ${
            theme === 'dark' ? 'bg-white' : 'bg-[#171a1f]'
          }`}
          variant="plain"
          text={theme === 'dark' ? 'day' : 'night'}
          onTap={toggleTheme}
        />
        <Button
          className={`${STYLES.actionButton} bg-[#171a1f]`}
          variant="plain"
          text="Report"
        />
      </view>
    </view>
  );
}
