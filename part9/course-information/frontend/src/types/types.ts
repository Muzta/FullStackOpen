interface CourseBase {
  name: string;
  exerciseCount: number;
}

interface CourseGroup extends CourseBase {
  groupProjectCount: number;
  kind: "group";
}

interface CourseDescription extends CourseBase {
  description: string;
}

interface CourseBasic extends CourseDescription {
  kind: "basic";
}

interface CourseBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CourseRequirements extends CourseDescription {
  requirements: string[];
  kind: "requirements";
}

export type Course =
  | CourseBasic
  | CourseGroup
  | CourseBackground
  | CourseRequirements;
