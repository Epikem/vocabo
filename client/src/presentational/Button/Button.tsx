import * as React from 'react';
import { ButtonBox } from './ButtonStyles';

const Button: any = ({children, onClick}: {children: string, onClick: any}, props:any) => {
  return (
    <ButtonBox onClick={onClick} {...props}>{children}</ButtonBox>
  )
}

export default Button;