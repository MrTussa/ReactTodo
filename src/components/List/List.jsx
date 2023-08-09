import s from "./List.module.css";
import { NewItem } from "../../components";
export default function List({ children, data, inputChange, onClickState, deleteTodo }) {
  return (
    <>
      <ul className={s.list}>
        {data.map(({text, state, id}) => {
          return (
            <li key={id} className={s.listItem}>
              <NewItem id={id} content={text} inputChange={inputChange} btnState={state} onClickState={onClickState} deleteTodo={deleteTodo}></NewItem>
            </li>
          );
        })}
        {children}
      </ul>
    </>
  );
}
