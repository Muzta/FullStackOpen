interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return <p>Number of total exercises {props.total}</p>;
};

export default Total;
