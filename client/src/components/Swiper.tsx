import { useState } from '@lynx-js/react';
import SwiperItem from './SwiperItem.jsx';
import { useUpdateSwiperStyle } from '../hooks/useUpdateSwiperStyle.jsx';
import { useOffset } from '../hooks/useOffset.jsx';
import Indicator from './Indicator/index.jsx';

export function Swiper({
  data,
  itemWidth = SystemInfo.pixelWidth / SystemInfo.pixelRatio,
}: {
  data: string[];
  itemWidth?: number;
}) {
  const [current, setCurrent] = useState(0);
  const { containerRef, updateSwiperStyle } = useUpdateSwiperStyle();
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useOffset({
    onOffsetUpdate: updateSwiperStyle,
    onIndexUpdate: setCurrent,
    itemWidth: itemWidth,
  });

  return (
    <view className="flex-1 w-full h-full">
      <view
        className="rounded-xl h-full w-full"
        style={{
          display: `linear`,
          linearOrientation: 'horizontal',
        }}
        main-thread:ref={containerRef}
        main-thread:bindtouchstart={handleTouchStart}
        main-thread:bindtouchmove={handleTouchMove}
        main-thread:bindtouchend={handleTouchEnd}
      >
        {data.map((pic) => (
          <SwiperItem pic={pic} itemWidth={itemWidth} />
        ))}
      </view>
      <Indicator total={data.length} current={current} />
    </view>
  );
}
