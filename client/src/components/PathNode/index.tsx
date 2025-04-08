import icons from '../../constants/icons.js';

export default function Node({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <view
      className={`flex flex-col justify-center items-center gap-3  ${className}`}
    >
      <view className="flex justify-center items-center min-w-28 min-h-28 rounded-xl border-2 border-[#bcc1ca]">
        <image src={icons.star} className="w-20 h-20" />
      </view>
      {children}
    </view>
  );
}
