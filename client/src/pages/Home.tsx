import Button from '../components/Button/Button.jsx';
import Card from '../components/Card.jsx';
import icons from '../constants/icons.js';

export default function Home() {
  return (
    <view className="container flex flex-col justify-center items-center">
      <text className="text-lg mt-8 text-[#9095a0] font-bold">
        Welcome back, Student Nurse!
      </text>

      <scroll-view className="w-[350px]" scroll-orientation="horizontal">
        <Card title="Fundamentals">
          <image src={icons.note} className="w-14 h-14" />
        </Card>
      </scroll-view>
    </view>
  );
}
