import { QuestionType, SubjectTitle } from '../constants/subject.js';
import { STYLES } from '../pages/Content/styles.js';
import type { SelectedQuestion, SequenceItem } from '../types/types.js';
import Button from './Button/Button.jsx';

export default function QuizView({
  current,
  sequence,
  anim,
  selectedChoice,
  selectedId,
  setSelectedId,
  selectChoice,
  confirmSequence,
  moveUp,
  moveDown,
  finish,
  handleCardPress,
  theme,
}: {
  current: SelectedQuestion | null;
  sequence: SequenceItem[];
  anim: { direction: 'left' | 'right' | null; showingBack: boolean } | null;
  selectedChoice: number | null;
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  selectChoice: (choice: string, index: number) => void;
  confirmSequence: () => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  finish: (isCorrect: boolean, userAnswer: any) => void;
  handleCardPress: () => void;
  theme: 'light' | 'dark';
}) {
  return (
    <>
      {!anim?.showingBack ? (
        <>
          <view className={STYLES.questionContainer}>
            <view
              className={
                'absolute top-[-30px] right-2 bg-[#eefdf3] py-2 px-6 rounded-full'
              }
            >
              <text className="text-[#117b34]">{current?.difficulty}</text>
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
                              theme === 'dark' ? 'bg-[#3a3a3a]' : 'bg-[#f3f4f6]'
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
                    {current?.choices?.map((choice: string, index: number) => (
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
                                theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
                              }`
                        } my-2`}
                        variant="plain"
                        text={choice}
                        onTap={() => selectChoice(choice, index)}
                      />
                    ))}
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
                      theme === 'dark' ? 'bg-[#ed7d2d]' : 'border-[#ed7d2d]'
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
                  ? QuestionType[current.type as keyof typeof QuestionType]
                  : ''}
              </text>
              <text
                className={`${STYLES.footerText} ${
                  theme === 'dark' ? 'text-gray-400' : 'text-[#bcc1ca]'
                }`}
              >
                {current?.subject
                  ? SubjectTitle[current.subject as keyof typeof SubjectTitle]
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
  );
}
