import s from "./RadioBtn.module.css";
import cslx from "clsx";
export default function RadioBtn({
  onClick,
  state = "unchecked",
  data,
  className,
}) {
  return (
    <div
      onClick={onClick}
      className={cslx(s.radioContainer, className, {
        [s.radioPadding]: state === "delete" || "edit" || "checkmark"
      })}
    >
      {state === "unchecked" && (
        <div data-index={data} className={s.radio}>
          <img src="./unchecked.svg" className={s.img} />
        </div>
      )}
      {state === "checked" && (
        <img data-index={data} src="./check.svg" className={s.img} />
      )}
      {state === "add" && (
        <img data-index={data} src="./plus.svg" className={s.img} />
      )}
      {state === "delete" && (
        <img data-index={data} src="./remove.svg" className={s.imgWidth} />
      )}
      {state === "edit" && (
        <img data-index={data} src="./edit.svg" className={s.imgWidth} />
      )}
      {state === "checkmark" && (
        <img data-index={data} src="./checkmark.svg" className={s.imgWidth} />
      )}
    </div>
  );
}
