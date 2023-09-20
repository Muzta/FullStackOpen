import { useState } from "react";

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </>
  );
};

const MyButtons = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // No need to do length - 1 as the floor function keeps it always within the bounds
  const randomNumber = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(randomNumber());
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [popular, setPopular] = useState(null);

  const nextAnecdote = () => {
    const newRandomNumber = randomNumber();
    if (newRandomNumber == selected) {
      return nextAnecdote();
    }
    setSelected(newRandomNumber);
  };

  const vote = () => {
    const pointsCopy = [...points];
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
    if (pointsCopy[selected] > points[popular] || !popular) {
      setPopular(selected);
    }
  };

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={points[selected]}
      />
      <MyButtons handleClick={() => nextAnecdote()} text="Next anecdote" />
      <MyButtons handleClick={() => vote()} text="Vote" />
      {/* Render only if there've been any vote */}
      {popular && (
        <Anecdote
          title="Anecdote with most votes"
          anecdote={anecdotes[popular]}
          votes={points[popular]}
        />
      )}
    </div>
  );
};

export default App;
