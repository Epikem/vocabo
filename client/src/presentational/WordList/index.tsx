import * as React from 'react';
import { Word } from "src/store/search";
import { WordItem } from '../WordItem';

export const WordList = ({words}:{words: Word[]}) => {
  return (
    <div>
      <li>Korean | English</li>
      {words.map((e)=>{
        return <li key={e.id}>
          <WordItem word={e} />
        </li> ;
      })}
    </div>
  )
}