import * as React from "react";
import { Word } from "src/store/search";
import styled, { css, invertBox } from "src/theme";

const WordBox = styled.div`${({ theme }) => css`
  ${invertBox(theme)};
`}`;

export function Word({ word }: { word: Word }) {
  return (
    <WordBox style={{ padding: ".2rem" }}>
      {word.Korean} : {word.English}
    </WordBox>
  );
}
