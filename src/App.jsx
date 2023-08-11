import "./App.css";
import { List, ListNav, CategoryItem } from "./components";
import { useState, useRef, useEffect } from "react";
function App() {
  const startData = [
    {
      id: 0,
      category: {text: "work",
      color: "255, 200, 200",},
      text: "lorem lorem",
      state: "unchecked",
    },
    {
      id: 1,
      category: {text: "work",
      color: "255, 200, 200",},
      text: "lorem adasdasdlorem",
      state: "unchecked",
    },
    {
      id: 2,
      category: {text: "work",
      color: "255, 200, 200",},
      text: "lфывфывфывorem adasdasdlorem",
      state: "unchecked",
    },
    {
      id: 3,
      category: {text: "work",
      color: "255, 200, 200",},
      text: "lфывфывфывorem adasdasdlorem",
      state: "checked",
    },
    {
      id: 4,
      category: {text: "work",
      color: "255, 200, 200",},
      text: "lфывфывфывorem adasdasdlorem",
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
  const [currCategory, setCurrCategory] = useState("");
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
        : { ...item, checked: false }; //TODO: Исправить повторный клик на checked !!!ВЫЗЫВАЕТ ОШИБКИ
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
    let value = newArray.filter((item) => item.checked)[0].value;
    switch (value) {
      case "inProgress":
        value = "unchecked";
        break;
      case "completed":
        value = "checked";
        break;
    }
    const newData = data.filter((item) => item.state === value);
    setFilteredData(newData);
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
      //Without checked click
      // obj.id === objIndex && obj.state === "unchecked"
      // ? { ...obj, state: "checked" }
      // : obj
      if (obj.id === objIndex && obj.state === "unchecked") {
        return { ...obj, state: "checked" };
      } else if (obj.id === objIndex && obj.state === "checked") {
        return { ...obj, state: "unchecked" };
      } else {
        return obj;
      }
    });
    setData(newData);
  };

  const deleteTodo = (e) => {
    const {
      dataset: { index },
    } = e.target;
    // const newData = data.filter((obj) => obj.id != index); Old delte without saving
    const objIndex = data.findIndex((obj) => obj.id == index);
    const newData = data.map((obj) => {
      if (obj.id === objIndex && obj.state !== "removed") {
        return { ...obj, state: "removed" };
      } else {
        return obj;
      }
    });
    setData(newData);
  };
  //Click buttons

  const categoryClickHandler = (e) => {
    const {
      dataset: { index },
    } = e.target;
    const objIndex = category.findIndex((obj) => obj.id == index);
    const newData = data.map((obj) =>
      obj.id === objIndex ? { ...obj, text: value } : obj
    );
    setData(newData);
  };
  useEffect(() => {
    filterState(list);
  }, [data, list]);
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
          inputChange={inputChange}
          onClickState={changeStateHandler}
          deleteTodo={deleteTodo}
          
        ></List>
      </div>
    </>
  );
}

export default App;
