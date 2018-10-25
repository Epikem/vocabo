import * as React from 'react';
import { Word } from "src/store/search";
import styled, { css } from 'src/theme';

const WordTable = styled.table`${({ theme }) => css`
  margin: auto;
  border: 1px solid ${theme.borderColor};
  width: 85%;
`}`;

const WordTableCell = styled.td`${({ theme }) => css`
  padding: .5rem;
  border: 1px solid ${theme.borderColor};
`}`;

export const WordList = ({words}:{words: Word[]}) => {
  return (
    <WordTable>
      <tr>
        <WordTableCell>{'Korean'}</WordTableCell>
        <WordTableCell>{'English'}</WordTableCell>
      </tr>
      {words.map((e)=>{
        return <tr key={e.id}>
          <WordTableCell>{e.Korean}</WordTableCell>
          <WordTableCell>{e.English}</WordTableCell>
        </tr> ;
      })}
    </WordTable>
  )
}