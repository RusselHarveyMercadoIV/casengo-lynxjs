import icons from '../../constants/icons.js';

export default function Node({
  children,
  className,
  onTap,
}: {
  children?: React.ReactNode;
  className?: string;
  onTap?: () => void;
}) {
  return (
    <view
      className={`flex flex-col justify-center items-center gap-3  ${className}`}
      bindtap={onTap}
    >
      <view className="flex justify-center items-center min-w-28 min-h-28 rounded-xl border-2 border-[#bcc1ca]">
        <image src={icons.star} className="w-20 h-20" />
      </view>
      {children}
    </view>
  );
}
