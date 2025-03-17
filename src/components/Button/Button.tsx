import styles from './Button.module.css';

type ButtonType = {
  text: string;
  variant: 'orange' | 'white' | 'plain';
};

export default function Button({ text, variant }: ButtonType) {
  let buttonVariantCss = styles.plain;
  if (variant === 'orange') buttonVariantCss = styles.orange;
  if (variant === 'white') buttonVariantCss = styles.white;

  return (
    <view
      className={`flex justify-center items-center border border-4 rounded-2xl min-w-[350px] min-h-[60px]  ${buttonVariantCss}`}
    >
      <text
        className={`text-xl ${variant === 'orange' ? 'text-white' : 'text-[#ed7d2d]'} font-bold`}
      >
        {text}
      </text>
    </view>
  );
}
