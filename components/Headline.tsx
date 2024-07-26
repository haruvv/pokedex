import { Component, ReactNode } from 'react';

type Item = {
  foo: string;
  key: string;
  id: number;
};

type HeadlineProps = {
  title: string;
  number: number;
  array: string[];
  obj: Item;
  boo: boolean;
  cmp: ReactNode;
  // onClick: () => void;
};

export function Haedline(props: HeadlineProps): JSX.Element {
  return (
    <>
      <h1>あーーーーー</h1>
      <div>
        {props.title}
        {props.number}
        {props.array[2]}
        {props.obj.id}
        {props.boo}
      </div>
      {props.cmp}
      {/* <button onClick={props.onClick}>ボタン</button> */}
    </>
  );
}
