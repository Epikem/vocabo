import * as React from 'react';

const Counter = (props: any) => {
  const { count, onIncrement } = props;
  return(
    <div>
      current Counter = 
      <div>
        {count}
      </div>
      <button onClick={onIncrement}>increment</button>
    </div>
  )
}

export { Counter };