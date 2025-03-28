import Button from '../components/Button/Button.jsx';
import Card from '../components/Card.jsx';
import icons from '../constants/icons.js';

const cardNavigations = [
  {
    id: '1',
    title: 'Fundamentals',
    icon: icons.checklist,
    sub: 'Patient safety and communication',
  },
  {
    id: '2',
    title: 'Core',
    icon: icons.books,
    sub: 'Patient safety and communication',
  },
  {
    id: '3',
    title: 'Case Studies',
    icon: icons.magnifying,
    sub: 'Patient safety and communication',
  },
  {
    id: '4',
    title: 'Theory',
    icon: icons.theory,
    sub: 'Patient safety and communication',
  },
];

export default function Home() {
  return (
    <view className="flex flex-col  h-full justify-center items-center">
      <view className="fixed top-10 right-5 bg-yellow-500 rounded-full">
        <image src={icons.trophy} className="p-2 w-16 h-16" />
      </view>

      <scroll-view
        className="flex flex-col items-center pt-16 h-full w-full"
        scroll-orientation="vertical"
      >
        <view className="flex flex-col w-[350px] mb-10">
          <text className="text-md w-fit bg-white text-[#515358] mb-4 ">
            Welcome back, Student Nurse!
          </text>
          <view className=" flex flex-col gap-4">
            <text className="text-5xl text-[#ed7d2d] font-bold">
              Fundamentals
            </text>
            <view className="flex flex-col justify-center items-start w-[350px] h-[120px] bg-[#ed7d2d] rounded-xl px-4 py-2">
              <view className="flex flex-row justify-between items-center w-full">
                <view>
                  <text className="text-white text-2xl font-bold">
                    Patient care
                  </text>
                  <text className="text-white ">
                    Continue where you left off
                  </text>
                </view>
                <image src={icons.checklist} className="w-16 h-16" />
              </view>

              <view className="w-full bg-white rounded-full h-5 relative mt-2">
                <view
                  className="bg-orange-300 h-5 rounded-full transition-all"
                  style={{ width: '70%' }}
                ></view>
              </view>
            </view>
          </view>
        </view>
        <view className="flex h-fit flex-col gap-8">
          <text className="font-semibold">Recent Activities</text>
          <list
            className="flex justify-between w-[350px]"
            list-type="waterfall"
            scroll-orientation="horizontal"
            custom-list-name="list-container"
          >
            {cardNavigations.map((item) => (
              <list-item item-key={item.id} key={item.id} className="mr-6">
                <Card title={item.title}>
                  <image src={item.icon} className="w-16 h-16" />
                </Card>
              </list-item>
            ))}
          </list>
        </view>
        <view className=" flex flex-col mt-10 gap-8">
          <text className="font-semibold">Browse</text>
          <list
            className="flex justify-between w-[350px] "
            list-type="waterfall"
            scroll-orientation="vertical"
            column-count={3}
            custom-list-name="list-container"
          >
            {cardNavigations.map((item) => (
              <list-item item-key={item.id} key={item.id}>
                <Card title={item.title}>
                  <image src={item.icon} className="w-16 h-16" />
                </Card>
              </list-item>
            ))}
          </list>
        </view>
      </scroll-view>
    </view>
  );
}
