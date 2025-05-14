import { STYLES } from '../pages/Content/styles.js';
import Button from './Button/Button.jsx';

export default function LessonView({
  title,
  attribution,
  figures,
  paragraphs,
  currentPage,
  totalSteps,
  parseParagraphWithImages,
  handleNextPage,
  theme,
  parent,
}: {
  title: string;
  attribution: string | undefined;
  figures: any[];
  paragraphs: any[];
  currentPage: number;
  totalSteps: number;
  parseParagraphWithImages: (text: string, figures: any[]) => any[];
  handleNextPage: () => void;
  theme: 'light' | 'dark';
  parent?: { re: string };
}) {
  return (
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
          {paragraphs[0]?.title && (
            <text
              className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
              }`}
            >
              {paragraphs[0].title}
            </text>
          )}
          {parseParagraphWithImages(paragraphs[0]?.text, figures).map(
            (part, index) =>
              typeof part === 'string' ? (
                <text
                  key={`main-${index}`}
                  className={`text-xl ${
                    theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
                  }`}
                >
                  {part}
                </text>
              ) : (
                <view key={`main-img-${index}`}>{part}</view>
              ),
          )}
          {paragraphs[0]?.sub?.map((subItem: any, subIndex: number) => (
            <view key={`sub-${subIndex}`} className="flex flex-col gap-2">
              {subItem.title && (
                <text
                  className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
                  }`}
                >
                  {subItem.title}
                </text>
              )}
              {parseParagraphWithImages(subItem.text, figures).map(
                (part, partIndex) =>
                  typeof part === 'string' ? (
                    <text
                      key={`sub-${subIndex}-${partIndex}`}
                      className={`text-xl ${
                        theme === 'dark' ? 'text-white' : 'text-[#9095a0]'
                      }`}
                    >
                      {part}
                    </text>
                  ) : (
                    <view key={`sub-img-${subIndex}-${partIndex}`}>{part}</view>
                  ),
              )}
            </view>
          ))}
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
  );
}
