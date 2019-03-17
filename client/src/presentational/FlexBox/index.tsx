import * as React from 'react';
import { DivProps } from 'src/lib';
import styled from 'styled-components';
 
interface FlexBoxProps extends DivProps {
  direction: string;
}

const FlexBoxComponent: React.FunctionComponent<FlexBoxProps & {direction: string}> = ({direction, ...props}) => <div className={props.className}>{props.children}</div>;

export const FlexBox = styled(FlexBoxComponent)`
  display: flex;
  flex-direction: ${props => props.direction};
`;
