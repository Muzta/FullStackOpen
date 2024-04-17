interface CourseContent {
  name: string;
  exerciseCount: number;
}

interface ContentProp {
  courses: CourseContent[];
}

const Content = (props: ContentProp) => {
  return (
    <>
      {props.courses.map((course: CourseContent) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
