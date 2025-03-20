import { type ReactNode } from 'react';
import styles from './Button.module.css';
import { useTheme } from '../../context/ThemeContext.jsx';

type ButtonType = {
  text?: string;
  sup?: string;
  sub?: string;
  secondText?: string;
  variant: 'orange' | 'white' | 'plain';
  onTap?: () => void;
  isHighlighted?: boolean;
  icon?: ReactNode;
  className?: string;
  key?: number | string;
  disabled?: boolean;
  bold?: boolean;
};

export default function Button({
  text,
  sup,
  sub,
  secondText,
  variant,
  onTap,
  isHighlighted,
  icon,
  className,
  key,
  disabled,
  bold,
}: ButtonType) {
  const { theme } = useTheme();
  let buttonVariantCss = styles.plain;
  if (variant === 'orange') buttonVariantCss = styles.orange;
  if (variant === 'white') buttonVariantCss = styles.white;

  // Check if the button has a white background in dark mode
  const hasWhiteBg = className?.includes('bg-white') && theme === 'dark';

  return (
    <view
      key={key}
      className={`flex items-center border ${variant === 'plain' ? 'border-2' : 'border-4'} rounded-2xl ${buttonVariantCss} ${className} ${isHighlighted && styles.highlighted}`}
      bindtap={!disabled ? onTap : () => {}}
    >
      {sup && (
        <text className="absolute text-xs font-bold top-0 right-0 bg-[#1ac052] text-white py-2 px-3 rounded-lg">
          {sup}
        </text>
      )}

      {icon && icon}
      {text && (
        <>
          <view className="flex flex-col gap-5">
            <text
              className={`text-xl ${
                variant === 'orange'
                  ? 'text-white'
                  : variant === 'white'
                    ? 'text-[#ed7d2d]'
                    : hasWhiteBg
                      ? 'text-[#323842]'
                      : theme === 'dark'
                        ? 'text-white'
                        : 'text-[#323842]'
              } ${bold ? 'font-bold' : ''}`}
            >
              {text}
            </text>
            {sub && (
              <text
                className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-[#9095a0]'}`}
              >
                {sub}
              </text>
            )}
          </view>

          {secondText && (
            <text
              className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-[#9095a0]'}`}
            >
              {secondText}
            </text>
          )}
        </>
      )}
    </view>
  );
}
