/* eslint-disable indent */
const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER_ANECDOTE":
      return action.payload.filter;
    default:
      return state;
  }
};

export const filterAnecdote = (filter) => {
  return { type: "FILTER_ANECDOTE", payload: { filter } };
};

export default filterReducer;
