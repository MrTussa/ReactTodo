import s from "./List.module.css";
import { NewItem } from "../../components";
import { useSelector } from "react-redux";
export default function List({ children }) {
  const { filteredData } = useSelector((state) => state.todo);
  return (
    <>
      <ul className={s.list}>
        {children}
        {filteredData.map(({ text, state, id, categoryId }) => {
          return (
            <li key={id} className={s.listItem}>
              <NewItem
                id={id}
                content={text}
                btnState={state}
                categoryId={categoryId}
              ></NewItem>
            </li>
          );
        })}
      </ul>
    </>
  );
}
