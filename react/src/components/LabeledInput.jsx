import Styles from "./component.module.css";
import React from 'react';

// TODO: 多一個參數用於定義 label 相對於 input 的位置，目前位於 input 上方
export default React.forwardRef((props, ref) => {
  return (
    <div className={`${props.className}`}>
      <label htmlFor={props.id} className={Styles.label}>{props.text}</label>
      <input type={props.type} id={props.id} ref={ref && ref} />
    </div>
  )
});
