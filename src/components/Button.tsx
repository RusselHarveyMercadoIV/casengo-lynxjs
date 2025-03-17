type ButtonTypes = {
  className?: string;
  text?: string;
  description?: string;
  subText?: string;
  supText?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  isHighlighted?: boolean;
  handlePress?: () => void;
  onPress?: () => void;
};

export default function Button({
  className,
  text,
  description,
  subText,
  supText,
  children,
  disabled = false,
  isHighlighted,
  onPress,
}: ButtonTypes) {
  return (
    <view className="relative">
      <view
        className={`border  rounded-xl ${
          isHighlighted ? 'border-[#ed7d2d] bg-[#fff3ea]' : 'border-[#dee1e6]'
        }  border-2  flex  ${className} ${disabled && 'opacity-40'}`}
        bindtap={onPress}
      >
        {supText && (
          <text className="absolute  top-0 right-0 bg-[#1ac052] text-white py-2 px-3 rounded-lg">
            {supText}
          </text>
        )}
        {children}
        {text && (
          <view className="flex gap-5">
            <text
              className={`text-xl  line-30 font-[ABeeZee] ${
                isHighlighted ? 'text-[#ed7d2d]' : 'text-[#323842]'
              }`}
            >
              {text}
            </text>
            {description && (
              <text
                className={` ${
                  isHighlighted ? 'text-[#ed7d2d]' : 'text-[#9095a0]'
                } `}
              >
                {description}
              </text>
            )}
          </view>
        )}

        {subText && (
          <text
            className={`absolute right-6 ${
              isHighlighted ? 'text-[#ed7d2d]' : 'text-[#dee1e6]'
            } `}
          >
            {subText}
          </text>
        )}
      </view>
    </view>
  );
}
