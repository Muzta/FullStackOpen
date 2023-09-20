import { useState } from "react";

const MyButton = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const Statistics = ({ feedback }) => {
  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {feedback[0]}</p>
      <p>Neutral: {feedback[1]}</p>
      <p>Bad: {feedback[2]}</p>
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
      <MyButton handleClick={() => addFeedback("good")} text="good" />
      <MyButton handleClick={() => addFeedback("neutral")} text="neutral" />
      <MyButton handleClick={() => addFeedback("bad")} text="bad" />
      <Statistics feedback={[good, neutral, bad]} />
    </div>
  );
};

export default App;
