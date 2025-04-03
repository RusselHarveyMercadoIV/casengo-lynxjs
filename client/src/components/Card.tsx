import type { ReactNode } from 'react';

export default function Card({
  children,
  title,
  className,
}: {
  children?: ReactNode;
  title?: string;
  className?: string;
}) {
  if (title) {
    return (
      <view
        className={
          'flex flex-col gap-4 justify-center items-center min-w-28 min-h-28 rounded-xl bg-white ' +
          className
        }
      >
        {children}
        <text className="text-sm">{title}</text>
      </view>
    );
  }
  return (
    <view
      className={
        'flex justify-center items-center min-w-28 min-h-28 rounded-xl bg-white ' +
        className
      }
    >
      {children}
    </view>
  );
}
