import { useDispatch } from "react-redux";
import { filterAnecdote } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filter = event.target.value;
    dispatch(filterAnecdote(filter));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
