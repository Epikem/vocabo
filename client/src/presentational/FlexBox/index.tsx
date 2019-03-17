import * as React from 'react';
import { DivProps } from 'src/lib';
import styled from 'styled-components';

interface FlexBoxProps extends DivProps {
  direction: string;
}

export const FlexBox = styled<FlexBoxProps>(({direction, children, ...rest}) => (
  <div {...rest}>
    {children}
  </div>
))`
  display: flex;
  flex-direction: ${props => props.direction};
`;
