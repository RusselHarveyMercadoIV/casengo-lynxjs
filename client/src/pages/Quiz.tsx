import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Button from '../components/Button/Button.jsx';
import icons from '../constants/icons.js';
import type { SelectedQuestion, SubjectColorsType } from '../types/types.js';
import Separator from '../components/Separator.jsx';

const SHOWN_NODES = 30;

// Define a type for sequence items
type SequenceItem = {
  id: string;
  text: string;
};

// Styles
const STYLES = {
  container: 'flex flex-col items-center bg-white h-full mt-10',
  header: 'flex w-[340px] flex-row justify-center items-center',
  backButton: 'absolute left-0 w-[20px] h-[20px]',
  progressContainer: 'w-[270px] ml-10 h-[20px]',
  cursor: 'w-[10px] h-[10px] left-[-2.5px] top-[22px] absolute',
  progressBar: 'flex flex-row gap-1 items-center h-full w-full overflow-hidden',
  progressDot: 'w-[6px] h-[12px] rounded-full opacity-50',
  remainingCount: 'text-sm text-[#ed7d2d]',
  questionCard:
    'flex flex-col bg-white justify-between py-8 border-x-2 border-[#dee1e6] items-center w-[370px] h-[665px] mt-7 mb-3 rounded-lg',
  questionContainer: 'flex flex-col flex-1 px-8 w-[350px]',
  questionText: 'text-2xl text-clip  mb-4  text-[#323842]',
  choicesContainer: 'h-[350px] grow justify-center ',
  choiceButton: 'py-6 px-4 rounded-xl w-full',
  choiceText: 'text-lg text-center text-[#565e6c]',
  sequenceItem: 'p-[10px] my-[5px] rounded-[8px] flex flex-row items-center',
  sequenceText: 'text-lg text-[#565e6c] flex-1',
  sequenceControls: 'flex flex-row gap-2',
  sequenceButton:
    'w-8 h-8 flex items-center justify-center rounded-full bg-[#f0f0f0]',
  activeSequenceItem: 'bg-[#fff3ea] border border-[#ed7d2d]',
  inactiveSequenceItem: 'bg-[#f0f0f0]',
  sequenceInstructions: 'text-sm text-gray-500 mt-2',
  buttonContainer: 'flex gap-10 flex-row mb-10',
  dontKnowButton: 'px-6 py-5 rounded-2xl bg-[#f3f4f6]',
  dontKnowText: 'text-xl text-[#565e6c]',
  confirmButton: 'border border-1 border-[#ed7d2d] px-6 py-5 rounded-2xl',
  confirmText: 'text-xl text-[#ed7d2d]',
  footer:
    'w-full flex flex-row justify-between items-center border-t border-[#bcc1ca] pt-2',
  footerText: 'text-[#bcc1ca] text-sm',
  bottomBar: 'flex flex-row justify-around w-[350px] opacity-70',
  actionButton: 'px-5 py-3 rounded-2xl',
  actionText: 'text-md text-white',
} as const;

export default function Quiz() {
  const [items, setItems] = useState<SelectedQuestion[]>([]);
  // State to manage the current order of sequencing choices
  const [sequenceOrder, setSequenceOrder] = useState<SequenceItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const handleFinishQuestion = () => {
    setItems((prevItems) => prevItems.slice(1));
  };

  // Handler for the Confirm button to check the sequence
  const handleConfirm = () => {
    if (currentItem && currentItem.type === 'sequencing') {
      const currentTexts = sequenceOrder.map((item) => item.text);
      const isCorrect =
        JSON.stringify(currentTexts) === JSON.stringify(currentItem.answer);
      console.log(isCorrect ? 'Correct' : 'Incorrect'); // Replace with your scoring logic
    }
    handleFinishQuestion();
  };

  // Functions to move items up and down in the sequence
  const moveItemUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...sequenceOrder];
      const temp = newOrder[index];
      newOrder[index] = newOrder[index - 1];
      newOrder[index - 1] = temp;
      setSequenceOrder(newOrder);
      setSelectedIndex(index - 1);
    }
  };

  const moveItemDown = (index: number) => {
    if (index < sequenceOrder.length - 1) {
      const newOrder = [...sequenceOrder];
      const temp = newOrder[index];
      newOrder[index] = newOrder[index + 1];
      newOrder[index + 1] = temp;
      setSequenceOrder(newOrder);
      setSelectedIndex(index + 1);
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
      setSelectedIndex(null);
    }
  }, [currentItem]);

  const total = items.length - SHOWN_NODES;

  return (
    <view className={STYLES.container}>
      {/* Header */}
      <view className={STYLES.header}>
        <view className={STYLES.backButton} bindtap={() => navigation(-1)}>
          <image src={icons.closebtn} className="w-full h-full" />
        </view>
        <view className={STYLES.progressContainer}>
          <image className={STYLES.cursor} src={icons.cursor} />
          <view
            className={`${STYLES.progressBar} ${
              total > 0 ? 'border-r-[4px] border-[#ed7d2d]' : ''
            }`}
          >
            {items.map((item, index) => (
              <view
                key={index}
                className={STYLES.progressDot}
                style={{
                  backgroundColor:
                    SubjectColors[item.subject as keyof typeof SubjectColors],
                }}
              />
            ))}
          </view>
        </view>
        {total > 0 && <text className={STYLES.remainingCount}> +{total}</text>}
      </view>

      {/* Question Display */}
      {items.length > 0 && currentItem && (
        <view className={STYLES.questionCard}>
          <view className={STYLES.questionContainer}>
            <text className={STYLES.questionText}>{currentItem.question}</text>
            <view className={STYLES.choicesContainer}>
              {currentItem.type === 'sequencing' ? (
                <view>
                  <view className="flex flex-col w-full">
                    {sequenceOrder.map((item, index) => (
                      <view
                        item-key={item.id}
                        key={item.id}
                        className={`${STYLES.sequenceItem} ${
                          selectedIndex === index
                            ? STYLES.activeSequenceItem
                            : STYLES.inactiveSequenceItem
                        }`}
                        bindtap={() => setSelectedIndex(index)}
                      >
                        <text className={STYLES.sequenceText}>{item.text}</text>
                        <view className={STYLES.sequenceControls}>
                          <view
                            className={STYLES.sequenceButton}
                            bindtap={(e) => {
                              e.stopPropagation();
                              moveItemUp(index);
                            }}
                          >
                            <text>↑</text>
                          </view>
                          <view
                            className={STYLES.sequenceButton}
                            bindtap={(e) => {
                              e.stopPropagation();
                              moveItemDown(index);
                            }}
                          >
                            <text>↓</text>
                          </view>
                        </view>
                      </view>
                    ))}
                  </view>
                  <text className={STYLES.sequenceInstructions}>
                    (Arrange these steps in the correct order)
                  </text>
                </view>
              ) : (
                // Multiple-choice or case-based UI
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
                          className={STYLES.choiceButton + ' my-2'}
                          variant="plain"
                          text={choice}
                          onTap={handleFinishQuestion}
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
                  className={STYLES.dontKnowButton}
                  variant="plain"
                  text="I don't know"
                  onTap={handleFinishQuestion}
                />
                <Button
                  className={STYLES.confirmButton}
                  variant="plain"
                  text="Confirm"
                  onTap={handleConfirm}
                />
              </view>
            )}
            <view className={STYLES.footer}>
              <text className={STYLES.footerText}>
                {QuestionType[currentItem.type as keyof typeof QuestionType]}
              </text>
              <text className={STYLES.footerText}>
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
          className={`${STYLES.actionButton} bg-[#171a1f]`}
          variant="plain"
          text="night/day"
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
