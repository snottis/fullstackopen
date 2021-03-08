import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
  );
  const [selected, setSelected] = useState(0);

  const randomize = () => {
    let i;
    for (
      i = Math.floor(Math.random() * anecdotes.length);
      i === selected;
      i = Math.floor(Math.random() * anecdotes.length)
    ) {}
    return i;
  };
  const randomAnecdote = () => setSelected(randomize);
  const addPoints = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };
  return (
    <div>
      <Section
        title="Anecdote of the day"
        anecdote={props.anecdotes[selected]}
        points={points[selected]}
      />
      <button onClick={addPoints}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
      <Section
        title="Anecdote with most votes"
        anecdote={props.anecdotes[points.indexOf(Math.max(...points))]}
        points={points[points.indexOf(Math.max(...points))]}
      />
    </div>
  );
};

const Section = ({ title, anecdote, points }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>
        {anecdote} <br />
        has {points} votes
      </p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
