import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/Anecdotes";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
