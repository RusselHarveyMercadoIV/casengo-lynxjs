export default function Node({ children }: { children: React.ReactNode }) {
  return (
    <view className=" min-w-32 min-h-32 rounded-xl border-1">{children}</view>
  );
}
