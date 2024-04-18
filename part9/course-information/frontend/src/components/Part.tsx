import { Course } from "../types/types";

interface PartProps {
  course: Course;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  const course = props.course;
  let content;
  switch (course.kind) {
    case "basic":
      content = (
        <div>
          <i>{course.description}</i>
        </div>
      );
      break;
    case "background":
      content = (
        <>
          <div>{course.description}</div>
          <div>
            Background:{" "}
            <a href={course.backgroundMaterial} target="_blank">
              {course.backgroundMaterial}
            </a>
          </div>
        </>
      );
      break;
    case "group":
      content = <div>Group project count {course.groupProjectCount}</div>;
      break;
    case "requirements":
      content = <div>Required skills: {course.requirements.join(", ")}</div>;
      break;
    default:
      return assertNever(course);
  }

  return (
    <p>
      <div>
        <b>
          {course.name} {course.exerciseCount}
        </b>
      </div>
      {content}
    </p>
  );
};

export default Part;
