import { useDispatch, useSelector } from "react-redux";
import { onClickItem, dropdownHandler } from "../../store/todoSlice";
import s from "./ListNav.module.css";
import clsx from "clsx";
export default function ListNav({ dref }) {
  const { open, list } = useSelector((state) => state.todo);
  const currentType = list.filter((item) => item.checked)[0].value;
  const dispatch = useDispatch();
  const onClickItemHandler = (id) => {
    dispatch(onClickItem(id));
  };
  const onClick = () => {
    dispatch(dropdownHandler());
  };
  return (
    <div className={s.listContainer}>
      <div ref={dref}>
        <button onClick={onClick} className={clsx(s.button)}>
          {currentType}
        </button>
        {open && (
          <ul className={s.items}>
            {list.map((item) => {
              return (
                <li
                  onClick={() => {
                    if (item.checked === false) {
                      onClickItemHandler(item.id);
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
