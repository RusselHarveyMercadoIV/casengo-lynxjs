export default function SwiperItem({
  pic,
  itemWidth,
}: {
  pic: string;
  itemWidth: number;
}) {
  return (
    <view style={{ width: `${itemWidth}px`, height: `100%` }}>
      <image
        mode="scaleToFill"
        src={pic}
        className="rounded-xl h-full w-full"
      />
    </view>
  );
}
