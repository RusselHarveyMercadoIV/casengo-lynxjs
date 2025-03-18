import { type ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonType = {
  text?: string;
  variant: 'orange' | 'white' | 'plain';
  onTap?: () => void;
  isHighlighted?: boolean;
  icon?: ReactNode;
  className?: string;
  key?: number | string;
  disabled?: boolean;
};

export default function Button({
  text,
  variant,
  onTap,
  isHighlighted,
  icon,
  className,
  key,
  disabled,
}: ButtonType) {
  let buttonVariantCss = styles.plain;
  if (variant === 'orange') buttonVariantCss = styles.orange;
  if (variant === 'white') buttonVariantCss = styles.white;

  return (
    <view
      key={key}
      className={`flex ${icon ? 'justify-start' : 'justify-center'} items-center border ${variant === 'plain' ? 'border-2' : 'border-4'} rounded-2xl ${buttonVariantCss} ${className} ${isHighlighted && styles.highlighted}`}
      bindtap={!disabled ? onTap : () => {}}
    >
      {icon && icon}
      {text && (
        <text
          className={`text-xl ${variant === 'orange' ? 'text-white' : variant === 'white' ? 'text-[#ed7d2d]' : 'text-[#323842]'} font-bold`}
        >
          {text}
        </text>
      )}
    </view>
  );
}
