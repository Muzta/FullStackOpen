import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes}</div>
      <button onClick={handleClick}>Vote</button>
    </>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    // Filter the anecdotes that contains the text of the filter form
    const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
    // Sort that list of anecdotes
    filteredAnecdotes.sort((a1, a2) => a2.votes - a1.votes);
    return filteredAnecdotes;
  });

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote.id));
            dispatch(setNotification(`You voted "${anecdote.content}"`));
            setTimeout(() => {
              dispatch(removeNotification());
            }, 5000);
          }}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
