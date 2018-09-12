import * as React from 'react';
import styled from 'styled-components';

const FlexBoxContainer = styled.div<IFlexBoxProps>`
  display: flex;
  flex-direction: ${props => props.direction};
`;

export interface IFlexBoxProps {
  direction: string;
  children: any;
}

export function FlexBox (props: IFlexBoxProps) {
  return (
    <FlexBoxContainer {...props}>
      {props.children}
    </FlexBoxContainer>
  );
}
