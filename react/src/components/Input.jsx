import Styles from "./component.module.css"

export default function Input(props) {
  const attrs = {}
  switch (props.type) {
    case 'name':
      attrs.id = 'name'
      attrs.text = '名稱：'
      attrs.type = 'text'
      break;
    case 'email':
      attrs.id = 'email'
      attrs.text = '電郵：'
      attrs.type = 'text'
      break;
    case 'password':
      attrs.id = 'password'
      attrs.text = '密碼：'
      attrs.type = 'password'
      break;
    case 'confirm':
      attrs.id = 'confirm'
      attrs.text = '確認密碼：'
      attrs.type = 'password'
      break;
    default:
      attrs.id = ''
      attrs.text = ''
      attrs.type = 'text'
  }

  return (
    <div className={`${props.className}`}>
      <label className={Styles.lable} htmlFor={attrs.id}>{attrs.text}</label>
      <input type={attrs.type} id={attrs.id} />
    </div>
  )
}
