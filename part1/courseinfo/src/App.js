function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Content = ({ parts }) =>{
  const partList = parts.map(part => <Part part={part.name} exercises={part.exercises} />);
  
  return(
    <div>
      {partList}
    </div>
  );
};

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

const Total = ({ parts }) => {
  const getTotal = () => {
    let total = 0;
    parts.forEach(part => {
      total += part.exercises;
    });
    return total;
  };

  return(
    <p>Number of exercises {getTotal()}</p> // fancy solution to exercise 1.4
  );
};

export default App;