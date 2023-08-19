import Select from "react-select";
import { RadioBtn } from "../index";

import clsx from "clsx";
import s from "./AddItemForm.module.css";
export default function AddItemForm({
  options,
  selectHandler,
  submitHandler,
  textHandler,
  dref,
  open,
}) {
  return (
    open && (
      <>
        <div className={s.background}></div>
        <div className={s.form} ref={dref}>
          <div className={s.formColumn}>
            <span>Category</span>
            <Select
              options={options}
              onChange={selectHandler}
              className={s.formSize}
            />
          </div>
          <div className={s.formColumn}>
            <span>Text</span>
            <input
              type="text"
              onChange={textHandler}
              className={clsx(s.date, s.input)}
              required
            />
          </div>
          <div className={s.footerForm}>
            <button className={s.button} onClick={submitHandler}>
              <RadioBtn state="add" />
            </button>
          </div>
        </div>
      </>
    )
  );
}
