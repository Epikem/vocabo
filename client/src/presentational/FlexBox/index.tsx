import * as React from 'react';
import styled from 'styled-components';
import { DivProps } from 'src/lib';

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
