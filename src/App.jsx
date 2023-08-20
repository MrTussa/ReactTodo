import "./App.css";
import { List, ListNav, CategoryItem, RadioBtn } from "./components";
import { useState, useRef, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
function App() {
  const getStorageData = () => {
    return JSON.parse(localStorage.getItem("todoReact"));
  };
  const setStorageData = (data) => {
    localStorage.setItem("todoReact", JSON.stringify(data));
  };
  const startData = () => {
    if (localStorage.getItem("todoReact") === null) {
      return [
        {
          id: 0,
          categoryId: 0,
          text: "lorem lorem",
          state: "unchecked",
        },
        {
          id: 1,
          categoryId: 0,
          text: "один",
          state: "unchecked",
        },
        {
          id: 2,
          categoryId: 1,
          text: "два",
          state: "unchecked",
        },
        {
          id: 3,
          categoryId: 0,
          text: "три",
          state: "checked",
        },
        {
          id: 4,
          categoryId: 0,
          text: "четыре",
          state: "removed",
        },
      ];
    } else {
      return getStorageData;
    }
  };
  const startCategory = [
    {
      id: 0,
      text: "work",
      color: "255, 200, 200",
      state: false,
    },
    {
      id: 1,
      text: "home",
      color: "100, 100, 100",
      state: false,
    },
    {
      id: 2,
      text: "other",
      color: "200, 200, 200",
      state: false,
    },
    {
      id: 3,
      text: "daily",
      color: "0, 253, 169",
      state: false,
    },
  ];
  const [category, setCategory] = useState(startCategory);
  const [data, setData] = useState(startData());
  const [filteredData, setFilteredData] = useState(data);
  const [select, setSelect] = useState("");
  const [text, setText] = useState("");
  //DropdownList
  const [list, setList] = useState([
    {
      id: 0,
      value: "completed",
      checked: false,
    },
    {
      id: 1,
      value: "inProgress",
      checked: true,
    },
    {
      id: 2,
      value: "removed",
      checked: false,
    },
  ]);
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const currentType = list.filter((item) => item.checked)[0].value;
  const onClickItem = (id) => {
    const newArray = list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : { ...item, checked: false }
    );
    setList(newArray);
    filterState(newArray);
    setOpen(false);
  };
  const dropdownHandler = () => {
    setOpen((prev) => !prev);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
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
      ? data.filter((item) => item.categoryId === currentCategory.id)
      : undefined;
const filteredData =
    categoryFilter === undefined
      ? data.filter((item) => item.state === filteredValue)
        : categoryFilter.filter((item) => item.state === filteredValue);

    setFilteredData(filteredData);
  };
  //filter state

  //Edit TODO
  const inputChange = (e) => {
    const { value, dataset: { index } } = e.target;
    const objIndex = data.findIndex((obj) => obj.id === parseInt(index));
    const newData = data.map((obj) =>
      obj.id === objIndex ? { ...obj, text: value } : obj
    );
    setData(newData);
  };
  //Edit TODO

  //Click buttons
  const changeStateHandler = (e) => {
    const { dataset: { index } } = e.target;
    const objIndex = data.findIndex((obj) => obj.id === parseInt(index));
    const newData = data.map((obj) => {
      if (obj.id === objIndex) {
        return {
          ...obj,
          state: obj.state === "unchecked" ? "checked" : "unchecked",
        };
      }
      return obj;
    });
    setData(newData);
  };
  const deleteTodo = (e) => {
    const { dataset: { index } } = e.target;
    const objIndex = data.findIndex((obj) => obj.id === parseInt(index));
    const newData = data.map((obj) =>
      obj.id === objIndex && obj.state !== "removed"
        ? { ...obj, state: "removed" }
        : obj
    );
    setData(newData);
  };
  //Click buttons

  //Category Filter
  const categoryClickHandler = (e) => {
    const index = e.target.dataset.index;
    const objIndex = category.findIndex((obj) => obj.id === parseInt(index));
    let newObj;
    if (category[objIndex].state === false) {
      newObj = category.map((item) => ({
        ...item,
        state: item.id === objIndex ? !item.checked : false,
      }));
    } else {
      newObj = category.map((item) => ({
        ...item,
        state: false,
      }));
    }
    setCategory(newObj);
  };
  //Category Filter

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
    setData(newData);
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
  }, [data, list, category]);
  return (
    <>
      <div className="container">
        <div className="nav">
          <div className="category">
            {category.map(({ id, text, color, state }) => {
              return (
                <CategoryItem
                  id={id}
                  text={text}
                  color={color}
                  categoryClick={categoryClickHandler}
                  state={state}
                />
              );
            })}
          </div>
          <ListNav
            selected={currentType}
            open={open}
            onClickItem={onClickItem}
            onClick={dropdownHandler}
            dref={dropdownRef}
            array={list}
            filter={filterState}
          />
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
        <List
          data={filteredData}
          categories={category}
          inputChange={inputChange}
          onClickState={changeStateHandler}
          deleteTodo={deleteTodo}
        >
          <li className="addItem" onClick={dropdownFormHandler}>
            <RadioBtn state="add" />
          </li>
        </List>
      </div>
    </>
  );
}

export default App;
