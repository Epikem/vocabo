import * as React from 'react';
import styled from 'styled-components';

const FlexBoxContainer = styled.div<IFlexBoxProps>`
  display: flex;
  flex-direction: ${props => props.direction};
`;

export interface IFlexBoxProps {
  direction: string;
  children: React.ReactNode;
}

export const FlexBox: React.SFC<IFlexBoxProps> = (props) => {
  return (
    <FlexBoxContainer {...props}>
      {props.children}
    </FlexBoxContainer>
  );
}
