import Button from '../components/Button/Button.jsx';

export default function Home() {
  return (
    <view className="container flex flex-col justify-center items-center">
      <text className="text-xl mt-16">Welcome back, Student Nurse!</text>

      <scroll-view
        className="w-[350px]"
        scroll-orientation="horizontal"
      ></scroll-view>
    </view>
  );
}
