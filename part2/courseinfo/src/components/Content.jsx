import Part from "./Part.jsx";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>
        <b>
          Total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
          exercises
        </b>
      </p>
    </div>
  );
};

export default Content;
