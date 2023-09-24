import CourseHeader from "./CourseHeader.jsx";
import Content from "./Content.jsx";

const Course = ({ course }) => {
  return (
    <div>
      <CourseHeader title={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
