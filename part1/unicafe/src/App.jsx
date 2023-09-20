import { useState } from "react";

const MyButton = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const Statistics = ({ feedback }) => {
  const [good, neutral, bad] = feedback;
  const total = good + neutral + bad;

  if (total == 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }

  const average = () => good * 1 + bad * -1;
  const positive = () => (good / total) * 100;

  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average()}</p>
      <p>Positive: {positive()} %</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addFeedback = (feedback) => {
    if (feedback === "good") {
      setGood(good + 1);
    } else if (feedback === "neutral") {
      setNeutral(neutral + 1);
    } else if (feedback === "bad") {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <MyButton handleClick={() => addFeedback("good")} text="good" />
      <MyButton handleClick={() => addFeedback("neutral")} text="neutral" />
      <MyButton handleClick={() => addFeedback("bad")} text="bad" />
      <Statistics feedback={[good, neutral, bad]} />
    </div>
  );
};

export default App;
