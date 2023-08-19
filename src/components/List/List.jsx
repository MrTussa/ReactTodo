import s from "./List.module.css";
import { NewItem } from "../../components";
export default function List({children, data, inputChange, onClickState, deleteTodo, categories }) {
  return (
    <>
      <ul className={s.list}>
        {children}
        {data.map(({text, state, id, categoryId}) => {
          return (
            <li key={id} className={s.listItem}>
              <NewItem id={id} content={text} inputChange={inputChange} btnState={state} onClickState={onClickState} deleteTodo={deleteTodo} categoryId={categoryId} categoryData={categories}></NewItem>
            </li>
          );
        })}
      </ul>
    </>
  );
}
