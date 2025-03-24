import Button from '../components/Button/Button.jsx';

export default function DiagnosticResult() {
  return (
    <view className={STYLES.container}>
      <text>Hello</text>
      <Button
        text="CONTINUE"
        variant="orange"
        bold={true}
        // onTap={() => handleStepChange(1)}
        className={`mb-10 justify-center`}
      />
    </view>
  );
}

const STYLES = {
  container: 'flex flex-col bg-red-500 items-center justify-center h-full',
};
