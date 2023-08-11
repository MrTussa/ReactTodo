import "./App.css";
import { NewItem, List, ListNav } from "./components";
import { useState, useRef, useEffect } from "react";
function App() {
  const startData = [
    {
      id: 0,
      category: "Work",
      text: "lorem lorem",
      state: "unchecked",
    },
    {
      id: 1,
      category: "Work",
      text: "lorem adasdasdlorem",
      state: "unchecked",
    },
    {
      id: 2,
      category: "Work",
      text: "lфывфывфывorem adasdasdlorem",
      state: "unchecked",
    },
    {
      id: 3,
      category: "Work",
      text: "lфывфывфывorem adasdasdlorem",
      state: "checked",
    },
    {
      id: 4,
      category: "Work",
      text: "lфывфывфывorem adasdasdlorem",
      state: "removed",
    },
  ];
  const [category, setCategory] = useState("");
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
  const dropdownRef = useRef(null)

  const [open, setOpen] = useState(false)
  const currentType = list.filter(item => item.checked)[0].value
  const onClickItem = (id) => {
		const newArray = list.map(item => {
      
			return item.id === id
				? { ...item, checked: !item.checked }
				: { ...item, checked: false } //TODO: Исправить повторный клик на checked !!!ВЫЗЫВАЕТ ОШИБКИ
		})
		setList(newArray)
    filterState(newArray)
		setOpen(false)
	}
  const dropdownHandler = () => {
		setOpen(prev => {
			return !prev
		})
	}
  const handleClickOutside = event => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setOpen(false)
		}
	}
  useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open])
  //DropdownList

  //filter state

  const filterState = (newArray) => {
    let value = newArray.filter(item => item.checked)[0].value
    switch(value) {
      case "inProgress":
        value = "unchecked"
        break
      case "completed":
        value = "checked"
        break
    }
    const newData = data.filter(item => item.state === value)
    setFilteredData(newData)
  };

  //filter state
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
  const changeStateHandler = (e) => {
    const {
      dataset: { index },
    } = e.target;
    const objIndex = data.findIndex((obj) => obj.id == index);
    const newData = data.map((obj) =>
      obj.id === objIndex && obj.state === "unchecked"
      ? { ...obj, state: "checked" } 
      : obj
      );
    setData(newData);
  };
  useEffect(() => {
    filterState(list);
  }, [data, list]);
  const deleteTodo = (e) => {
    const {
      dataset: { index },
    } = e.target;
    const newData = data.filter((obj) => obj.id != index);
    setData(newData);
  };
  return (
    <>
      <div className="container">
        <ListNav
          selected={currentType}
          open={open}
          onClickItem={onClickItem}
          onClick={dropdownHandler}
          dref={dropdownRef}
          array={list}
          filter={filterState}
        />
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
