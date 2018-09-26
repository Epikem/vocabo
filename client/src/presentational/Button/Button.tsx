import * as React from 'react';
import { ButtonBox } from './ButtonStyles';

const Button = ({children, onClick}: {children: React.ReactNode, onClick?: React.MouseEventHandler}, props:Array<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {

  return (
    <ButtonBox onClick={onClick} {...props}>{children}</ButtonBox>
  )
}

export default Button;