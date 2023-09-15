import "./App.css";
import { List, ListNav, CategoryItem, RadioBtn } from "./components";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilteredData as setFilteredDataStore,
  setOpen,
  setData,
} from "./store/todoSlice";
import AddItemForm from "./components/AddItemForm";
function App() {
  const setStorageData = (data) => {
    localStorage.setItem("todoReact", JSON.stringify(data));
  };
  const [select, setSelect] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const storeData = useSelector((state) => state.todo.data);
  const { category, list, open, data } = useSelector((state) => state.todo);
  const [openForm, setOpenForm] = useState(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      dispatch(setOpen(false));
    }
  };
  const dropdownFormHandler = () => {
    setOpenForm((prev) => !prev);
  };
  const handleClickOutsideForm = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenForm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideForm);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideForm);
    };
  }, [openForm]);
  //DropdownList

  //filter state
  const filterState = (newArray) => {
    const value = newArray.find((item) => item.checked)?.value;
    const filteredValue =
      value === "inProgress"
        ? "unchecked"
        : value === "completed"
        ? "checked"
        : value;
    const currentCategory = category.find((item) => item.state === true);
    const categoryFilter = currentCategory
      ? storeData.filter((item) => item.categoryId === currentCategory.id)
      : undefined;
    const filteredData =
      categoryFilter === undefined
        ? storeData.filter((item) => item.state === filteredValue)
        : categoryFilter.filter((item) => item.state === filteredValue);
    dispatch(setFilteredDataStore(filteredData));
  };
  //filter state

  //Add item
  const addItem = () => {
    if (text === "") {
      return alert("Text required");
    }
    const categoryFilter =
      select !== ""
        ? category.filter((item) => item.text === select)
        : [{ id: 2 }];
    const newItem = {
      id: data[data.length - 1].id + 1,
      categoryId: categoryFilter[0].id,
      text: text,
      state: "unchecked",
    };
    const newData = [...data, newItem];
    setStorageData(newData);
    dispatch(setData(newData));
    setSelect("");
    setText("");
    setOpenForm(!openForm);
  };

  const selectHandler = (choise) => {
    setSelect(choise.value);
  };
  const textHandler = (e) => {
    setText(e.target.value);
  };
  const optionFormat = () => {
    return category.map(({ text }) => ({ value: text, label: text }));
  };
  //AddItem

  useEffect(() => {
    filterState(list);
  }, [list, category, storeData]);
  return (
    <>
      <div className="container">
        <div className="nav">
          <div className="category">
            <CategoryItem />
          </div>
          <ListNav dref={dropdownRef} filter={filterState} />
        </div>
        <AddItemForm
          dref={dropdownRef}
          open={openForm}
          onClick={dropdownFormHandler}
          options={optionFormat()}
          selectHandler={selectHandler}
          submitHandler={addItem}
          textHandler={textHandler}
        />
        <List>
          <li className="addItem" onClick={dropdownFormHandler}>
            <RadioBtn state="add" />
          </li>
        </List>
      </div>
    </>
  );
}

export default App;
