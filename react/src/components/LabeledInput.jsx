import Styles from "./component.module.css";
import { forwardRef } from "react";

// TODO: 多一個參數用於定義 label 相對於 input 的位置，目前位於 input 上方
const LabeledInput = forwardRef((props, ref) => {
    return (
        <div className={`${props.className}`}>
            <label htmlFor={props.id} className={Styles.label}>
                {props.text}
            </label>
            <input
                id={props.id}
                type={props.type}
                ref={ref}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
});

export default LabeledInput;
