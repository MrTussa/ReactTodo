import s from "./CategoryItem.module.css";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryState } from "../../store/todoSlice";
export default function CategoryItem({ item }) {
  const category =
    item === undefined ? useSelector((state) => state.todo.category) : item;
  const dispatch = useDispatch();
  const categoryClick = (item) => {
    const id = item.target.dataset.index;
    dispatch(setCategoryState(id));
  };
  return category.map(({ id, text, color, state }) => (
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
  ));
}
