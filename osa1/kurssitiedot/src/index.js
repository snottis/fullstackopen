import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  let parts = props.parts.map((part) => {
    return <Part key={part.name} part={part.name} exercise={part.exercises} />;
  });
  return parts;
};

const Total = (props) => {
  let sum = 0;
  props.parts.forEach((element) => {
    sum += element.exercises;
  });
  return <p>Number of exercises {sum}</p>;
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
ReactDOM.render(<App />, document.getElementById('root'));
