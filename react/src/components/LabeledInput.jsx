import Styles from "./component.module.css"
import { forwardRef } from 'react'

// TODO: 多一個參數用於定義 label 相對於 input 的位置，目前位於 input 上方
const LabeledInput = forwardRef((props, ref) => {
  return (
    <div className={`${props.className}`}>
      <label htmlFor={props.id} className={Styles.label} >{props.text}</label>
      <input id={props.id}  type={props.type} ref={ref} value={props.value} onChange={props.onChange}/>
    </div>
  )
})

/*
TODO: 修正 LabeledInput，同時支援 ref 和 onChange，但使用時擇一輸入
// 定義一個可前置引用的 InputField 組件
const InputField = forwardRef(({ label, value, onChange, ...props }, ref) => {
  // 如果有提供 onChange，則使用受控模式，否則使用 ref 進行非受控操作
  const isControlled = onChange !== undefined;

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type="text"
        ref={isControlled ? null : ref} // 受控模式不需要 ref
        value={isControlled ? value : undefined} // 如果受控，則設置 value
        onChange={isControlled ? onChange : null} // 如果受控，設置 onChange
        {...props} // 允許傳入其他參數
      />
    </div>
  );
});
*/

export default LabeledInput;