import s from "./NewItem.module.css";
import { RadioBtn, CategoryItem } from "..";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  inputChange,
  deleteTodo,
  changeStateHandler,
} from "../../store/todoSlice";
export default function NewItem({ content, btnState, id, categoryId }) {
  const [edit, setEdit] = useState(false);
  const editTodo = () => {
    setEdit(!edit);
  };
  const dispatch = useDispatch();
  const inputChangeHandler = (item) => {
    const {
      value,
      dataset: { index },
    } = item.target;
    dispatch(inputChange({ value: value, index: index }));
  };
  const deleteHandler = (item) => {
    const { index } = item.target.dataset;
    dispatch(deleteTodo(index));
  };
  const changeHandler = (item) => {
    const { index } = item.target.dataset;
    dispatch(changeStateHandler(index));
  };
  const categoryData = useSelector((state) => state.todo.category);
  const category = categoryData.filter((item) => item.id === categoryId);
  console.log(category);
  return (
    <div className={s.itemContainer}>
      {!edit && (
        <RadioBtn
          state={btnState}
          onClick={changeHandler}
          data={id}
          className={s.button}
        />
      )}
      <div className={s.content}>
        {edit ? (
          <textarea
            type="text"
            onChange={inputChangeHandler}
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
          <CategoryItem item={category} />
        </div>
        <div className={s.editButtons}>
          <RadioBtn
            state={!edit ? "edit" : "checkmark"}
            onClick={editTodo}
            data={id}
          />
          <RadioBtn state="delete" onClick={deleteHandler} data={id} />
        </div>
      </div>
    </div>
  );
}
