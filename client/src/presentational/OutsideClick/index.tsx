import React, { useRef, useEffect, MouseEventHandler } from 'react';

interface OutsideClickProps {
  children: React.ReactChild;
  onClick: React.MouseEventHandler<HTMLElement>;
}

function useOutsideClick(ref: React.MutableRefObject<HTMLElement>, onClick: OutsideClickProps['onClick']){
  function handleClickOutside(event: React.MouseEvent<HTMLElement>){
    if(ref.current && !ref.current.contains(event.target as Node)){
      onClick(event);
    }
  }

  useEffect(()=> {
    document.addEventListener('mousedown', handleClickOutside as any);
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside  as any);
    }
  });
}

export function OutsideClick(props: OutsideClickProps){
  const wrapperRef : React.MutableRefObject<any> = useRef(null);
  useOutsideClick(wrapperRef, props.onClick);

  return <div ref={wrapperRef}>{props.children}</div>
}