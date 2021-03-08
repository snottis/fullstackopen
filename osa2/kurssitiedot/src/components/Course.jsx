const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Content = (props) => {
  let parts = props.parts.map((part) => {
    return <Part key={part.name} part={part.name} exercise={part.exercises} />;
  });
  return parts;
};

const Total = ({ parts }) => {
  let sum = parts.map((i) => i.exercises).reduce((a, c) => a + c);
  return <b>Number of exercises {sum}</b>;
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};
export default Course;
