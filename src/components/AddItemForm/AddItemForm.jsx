import DatePicker from "react-datepicker";
import Select from 'react-select';
import { useState } from "react"
import { RadioBtn } from "../index"

import clsx from "clsx"
import "react-datepicker/dist/react-datepicker.css";
import s from "./AddItemForm.module.css";
export default function AddItemForm({ options, selectHandler, dateHandler, dateSelected , submitHandler, textHandler}) {
  return (
    <div  className={s.form}>
      <div className={s.formColumn}>
        <span>Date</span>
        {
          <DatePicker
            selected={dateSelected}
            onChange={dateHandler}
            className={s.date}
          />
        }
      </div>
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
          className={clsx(s.date, s.formSize)}
        />
      </div>
      <div className={s.footerForm}>
        <button onClick={submitHandler}><RadioBtn state="add"/></button>
      </div>
    </div>
  );
}
