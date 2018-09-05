import * as React from 'react';

const Counter = (props: any) => {
  const { count, increment } = props;
  return(
    <div>
      current Counter = 
      <div>
        {count}
      </div>
      <button onClick={increment}>increment</button>
    </div>
  )
}

export { Counter };