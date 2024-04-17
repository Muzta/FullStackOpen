import "./App.css";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    { name: "Fundamentals", exerciseCount: 10 },
    { name: "Using props to pass data", exerciseCount: 7 },
    { name: "Deeper type usage", exerciseCount: 14 },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
