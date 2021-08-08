import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const exerciseTotals = course.parts.map(part => part.exercises);
    const total = exerciseTotals.reduce((s,p) => s + p)
    return(
      <h4>total of {total} exercises</h4>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part part={part} />)}
      </div>
    )
  }

export default function Course({ course }) {
    return(
        <div style={{'textAlign': 'center'}}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
    );
}
