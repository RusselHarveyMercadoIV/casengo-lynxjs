import type { ReactNode } from 'react';

export default function Card({
  children,
  title,
}: {
  children?: ReactNode;
  title?: string;
}) {
  if (title) {
    return (
      <view className="flex flex-col justify-center items-center gap-4">
        <view className="flex justify-center items-center min-w-28 min-h-28 border-2 border-[#dee1e6] rounded-xl">
          {children}
        </view>
        <text className="text-[#9095a0]">{title}</text>
      </view>
    );
  }
  return (
    <view className="flex justify-center items-center min-w-28 min-h-28 border border-[#dee1e6] rounded-xl">
      {children}
    </view>
  );
}
