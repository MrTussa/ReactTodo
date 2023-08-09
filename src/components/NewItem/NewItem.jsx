import s from "./NewItem.module.css"
import { RadioBtn } from ".."
export default function NewItem({ content, btnState, onClickState, inputChange, id, deleteTodo }) {
    return(
    <div className={s.itemContainer}>
        <RadioBtn state={btnState} onClick={onClickState}  data={id}/>
        <div className={s.content}>
            <input type="text" onChange={inputChange} value={content} className={s.input} data-index={id}/>
        </div>
        <RadioBtn state="delete" onClick={deleteTodo} data={id}/>
    </div>
    )
}