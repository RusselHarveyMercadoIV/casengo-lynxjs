import { type ReactNode } from 'react';
import styles from './Button.module.css';
import { useTheme } from '../../context/ThemeContext.jsx';

type ButtonType = {
  text?: string;
  textStyle?: string;
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
  textStyle = '',
  sup,
  sub,
  secondText,
  variant,
  onTap,
  isHighlighted = false,
  icon,
  className = '',
  key,
  disabled = false,
  bold = false,
}: ButtonType) {
  const { theme } = useTheme();

  // Determine background context
  const hasWhiteBg = className.includes('bg-white') && theme === 'dark';

  // Compute text colors
  const mainTextColor = isHighlighted
    ? 'text-[#ed7d2d]'
    : variant === 'orange'
      ? 'text-white'
      : variant === 'white'
        ? 'text-[#ed7d2d]'
        : hasWhiteBg
          ? 'text-[#323842]'
          : theme === 'dark'
            ? 'text-white'
            : 'text-[#323842]';

  const subTextColor = isHighlighted
    ? 'text-[#ed7d2d]'
    : theme === 'dark'
      ? 'text-gray-400'
      : 'text-[#9095a0]';

  // Compute variant-specific styling
  const buttonVariantCss =
    variant === 'orange'
      ? styles.orange
      : variant === 'white'
        ? styles.white
        : styles.plain;

  const borderClass = variant === 'plain' ? 'border-2' : 'border-4';

  // Assemble class names
  const buttonClass = `flex items-center border ${borderClass} rounded-2xl ${buttonVariantCss} ${className} ${isHighlighted ? styles.highlighted : ''}`;
  const mainTextClass = `text-xl ${mainTextColor} ${bold ? 'font-bold' : ''} ${textStyle}`;
  const subTextClass = `text-sm ${subTextColor}`;

  return (
    <view
      key={key}
      className={buttonClass}
      bindtap={!disabled ? onTap : undefined}
    >
      {sup && (
        <text className="absolute text-xs font-bold top-0 right-0 bg-[#1ac052]  text-white py-2 px-3 rounded-lg">
          {sup}
        </text>
      )}
      {icon && icon}
      {text && (
        <>
          <view className="flex flex-col gap-5">
            <text className={mainTextClass}>{text}</text>
            {sub && <text className={subTextClass}>{sub}</text>}
          </view>
          {secondText && <text className={subTextClass}>{secondText}</text>}
        </>
      )}
    </view>
  );
}
