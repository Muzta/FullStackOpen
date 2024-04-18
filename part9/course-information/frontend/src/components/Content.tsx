import { Course } from "../types/types";
import Part from "./Part";

interface ContentProp {
  courses: Course[];
}

const Content = (props: ContentProp) => {
  return (
    <>
      {props.courses.map((course: Course) => (
        <div key={course.name}>
          <Part course={course} />
        </div>
      ))}
    </>
  );
};

export default Content;
