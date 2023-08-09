import s from "./RadioBtn.module.css";
import cslx from "clsx"
export default function RadioBtn({ onClick, state = "unchecked", data }) {
  return (
    <div  onClick={onClick} className={cslx(s.radioContainer, {[s.radioDelete]: state === "delete"})}>
      {state === "unchecked" && (
        <div data-index={data} className={s.radio}>
          <img src="./unchecked.svg" className={s.img}/>
        </div>
      )}
      {state === "checked" && (
          
          <img data-index={data} src="./check.svg" className={s.img}/>
          )}
      {state === "add" && (
          
          <img data-index={data} src="./plus.svg" className={s.img}/>
          )}
      {state === "delete" && (
          <img data-index={data} src="./remove.svg" className={s.imgDelete}/>
        
      )}
    </div>
  );
}
