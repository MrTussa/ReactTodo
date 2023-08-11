import s from "./CategoryItem.module.css";
export default function CategoryItem({ color, categoryClick, state = false, text, id}) {
  return (
    <div data-index={id} style={{borderColor: "rgba("+color+", 1)",backgroundColor: "rgba(" + color + ", 0.3)"}} key={id} className={s.item} onClick={categoryClick}>
      <span data-index={id} className={s.text}>{text}</span>
    </div>
  );
}
