import React from "react";
import { dispatch } from "reffects";

export default function TodoItem({ id, text, isDone }) {
  return <article onClick={() => {
    dispatch({ eventId: 'todoClicked', payload: { id, text, isDone } });
  }}>{isDone ? <s>{text}</s> : text}</article>;
}
