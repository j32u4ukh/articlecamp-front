import Styles from "./component.module.css"

// TODO: 多一個參數用於定義 label 相對於 input 的位置，目前位於 input 上方
export default function LabeledInput(props) {
  return (
    <div className={`${props.className}`}>
      <label className={Styles.label} htmlFor={props.id}>{props.text}</label>
      <input type={props.type} id={props.id} />
    </div>
  )
}
