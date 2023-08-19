import s from "./CategoryItem.module.css";
import clsx from "clsx"
export default function CategoryItem({
  color,
  categoryClick,
  state = false,
  text,
  id,
}) {
  return (
    <div
      data-index={id}
      style={{
        borderColor: "rgba(" + color + ", 1)",
        backgroundColor: "rgba(" + color + ", 0.3)",
      }}
      key={id}
      className={clsx(s.item, state && s.itemChecked)}
      onClick={categoryClick}
    >
      <span data-index={id} className={s.text}>
        {text}
      </span>
    </div>
  );
}
