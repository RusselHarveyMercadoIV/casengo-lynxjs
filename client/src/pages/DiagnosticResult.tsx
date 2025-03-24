import Button from '../components/Button/Button.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function DiagnosticResult() {
  const { theme } = useTheme();

  return (
    <view className={STYLES.container}>
      <text class="absolute top-28 font-bold text-2xl">Amazing!</text>
      <view className={STYLES.buttonList}>
        <Button
          key={'p6-1'}
          text="Anatomy & Physiology"
          sup="INTERMEDIATE"
          className={`${STYLES.buttonLarge} ${
            theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}
          sub="Solid understanding in anatomy & physiology"
          variant="plain"
        />
        <Button
          key={'p6-2'}
          text="Microbiology"
          sup="INTERMEDIATE"
          className={`${STYLES.buttonLarge} ${
            theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}
          sub="Solid understanding in microbiology"
          variant="plain"
        />
        <Button
          key={'p6-2'}
          text="Fundamentals"
          sup="INTERMEDIATE"
          className={`${STYLES.buttonLarge} ${
            theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
          }`}
          sub="Solid understanding in fundamentals"
          variant="plain"
        />
      </view>
      <view className="flex flex-col justify-center items-center gap-6 absolute bottom-0">
        <text className="text-sm text-[#9095a0] w-[300px]">
          You can view these results again in your profile with additional
          details.
        </text>
        <Button
          text="CONTINUE"
          variant="orange"
          bold={true}
          // onTap={() => handleStepChange(1)}
          className={` mb-10 justify-center min-w-[350px] min-h-[60px]`}
        />
      </view>
    </view>
  );
}

const STYLES = {
  container:
    'mx-auto w-[350px] flex flex-col items-center justify-center h-full',
  buttonList: 'flex h-[400px] flex-col gap-6',
  buttonLarge: 'flex-row gap-5 py-6 px-8 justify-start items-center w-[350px]',
};
