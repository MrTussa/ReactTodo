import s from "./NewItem.module.css";
import { RadioBtn, CategoryItem } from "..";
import { useState } from "react";
export default function NewItem({
  content,
  btnState,
  onClickState,
  inputChange,
  id,
  deleteTodo,
  categoryId,
  categoryData,
}) {
  const [edit, setEdit] = useState(false);
  const editTodo = () => {
    setEdit(!edit);
  };
  const category = categoryData.filter((item) => item.id === categoryId);
  const { color, text } = category[0];
  return (
    <div className={s.itemContainer}>
      <RadioBtn
        state={btnState}
        onClick={onClickState}
        data={id}
        className={s.button}
      />
      <div className={s.content}>
        {edit ? (
          <textarea
            type="text"
            onChange={inputChange}
            value={content}
            className={s.input}
            data-index={id}
          />
        ) : (
          <p className={s.text}>{content}</p>
        )}
      </div>
      <div className={s.editTab}>
        <div className={s.category}>
          <CategoryItem text={text} color={color} />
        </div>
        <div className={s.editButtons}>
          <RadioBtn state="edit" onClick={editTodo} data={id} />
          <RadioBtn state="delete" onClick={deleteTodo} data={id} />
        </div>
      </div>
    </div>
  );
}
