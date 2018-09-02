import * as React from 'react';
import { Button } from '../presentational';

class WordSearch extends React.Component<any, any>{
  public state = {

  }

  public constructor(props: any) {
    super(props);
    return this;
  }

  public render() {
    return (
      <div>
        WordSearch
        <Button>
          <div>
            test button
          </div>
        </Button>
      </div>
    )

  }
}

export default WordSearch;