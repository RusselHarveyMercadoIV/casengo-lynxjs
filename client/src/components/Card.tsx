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
      <view className="flex flex-col justify-center items-center gap-4 mb-6">
        <view
          className={
            'flex justify-center items-center min-w-28 min-h-28 border border-[#dee1e6] rounded-xl ' +
            className
          }
        >
          {children}
        </view>
        <text className="text-[#9095a0]">{title}</text>
      </view>
    );
  }
  return (
    <view
      className={
        'flex justify-center items-center min-w-28 min-h-28 border border-[#dee1e6] rounded-xl ' +
        className
      }
    >
      {children}
    </view>
  );
}
