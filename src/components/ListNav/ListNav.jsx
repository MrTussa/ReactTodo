import s from "./ListNav.module.css";
import clsx from "clsx";
export default function ListNav({
  array,
  open,
  onClick,
  onClickItem,
  dref,
  selected,
}) {
  return (
    <div className={s.listContainer}>
      <div ref={dref}>
        <button onClick={onClick} className={clsx(s.button)}>
          {selected}
        </button>
        {open && (
          <ul className={s.items}>
            {array.map((item) => {
              return (
                <li
                  onClick={() => {
                    if (item.checked === false) {
                      onClickItem(item.id);
                    }
                  }}
                  key={item.id}
                  className={clsx(s.item, {
                    [s.itemChecked]: item.checked === true,
                  })}
                >
                  {item.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
