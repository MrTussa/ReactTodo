import "./App.css";
import { List, ListNav, CategoryItem } from "./components";
import { useState, useRef, useEffect } from "react";
function App() {
  const startData = [
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
      color: "200, 200, 200",
      state: false,
    },
  ];
  const [category, setCategory] = useState(startCategory);
  const [data, setData] = useState(startData);
  const [filteredData, setFilteredData] = useState(data);
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
  const currentType = list.filter((item) => item.checked)[0].value;
  const onClickItem = (id) => {
    const newArray = list.map((item) => {
      return item.id === id
        ? { ...item, checked: !item.checked }
        : { ...item, checked: false };
    });
    setList(newArray);
    filterState(newArray);
    setOpen(false);
  };
  const dropdownHandler = () => {
    setOpen((prev) => {
      return !prev;
    });
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  //DropdownList

  //filter state
  const filterState = (newArray) => {
    let value = newArray.find((item) => item.checked)?.value;
    value =
      value === "inProgress"
        ? "unchecked"
        : value === "completed"
        ? "checked"
        : value;
    const newData = data.filter((item) => item.state === value);
    const currentCategory = category.find((item) => item.state === true);
    const categoryFilter = currentCategory
      ? newData.filter((item) => item.categoryId === currentCategory.id)
      : undefined;
    categoryFilter === undefined
      ? setFilteredData(newData)
      : setFilteredData(categoryFilter);
  };
  //filter state

  //Edit TODO
  const inputChange = (e) => {
    const {
      value,
      dataset: { index },
    } = e.target;
    const objIndex = data.findIndex((obj) => obj.id == index);
    const newData = data.map((obj) =>
      obj.id === objIndex ? { ...obj, text: value } : obj
    );
    setData(newData);
  };
  //Edit TODO

  //Click buttons
  const changeStateHandler = (e) => {
    const {
      dataset: { index },
    } = e.target;
    const objIndex = data.findIndex((obj) => obj.id == index);
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
    const {
      dataset: { index },
    } = e.target;
    const objIndex = data.findIndex((obj) => obj.id == index);
    const newData = data.map((obj) => {
      return obj.id === objIndex && obj.state !== "removed"
        ? { ...obj, state: "removed" }
        : obj;
    });
    setData(newData);
  };
  //Click buttons

  //Category Filter
  const categoryClickHandler = (e) => {
    const index = e.target.dataset.index;
    const objIndex = category.findIndex((obj) => obj.id == index);
    const newObj = category.map((item) => ({
      ...item,
      state: item.id === objIndex ? !item.checked : false,
    }));
    setCategory(newObj);
  };
  //Category Filter

  //Add item
  const addItem = (category, text) => {
    const newItem = {
      id: data[-1].id + 1,
      category: {
        text: category.text,
        color: category.color,
      },
      text: text,
      state: "unchecked",
    };
    setData(...data, newItem);
  };
  // {
  //   id: 4,
  //   category: { text: "work", color: "255, 200, 200" },
  //   text: "четыре",
  //   state: "removed",
  // },
  //Add item
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
        <List
          data={filteredData}
          categories={category}
          inputChange={inputChange}
          onClickState={changeStateHandler}
          deleteTodo={deleteTodo}
        ></List>
      </div>
    </>
  );
}

export default App;
