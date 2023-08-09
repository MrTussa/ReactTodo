import "./App.css";
import { NewItem, List } from "./components";
import { useState } from "react";
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
  ];

  const [category, setCategory] = useState("");
  const [currCategory, setCurrCategory] = useState("");
  const [state, setState] = useState("unchecked");
  const [data, setData] = useState(startData);
  const inputChange = (e) => {
    const {
      value,
      dataset: { index },
    } = e.target;
    const objIndex = data.findIndex((obj) => obj.id == index);
    const newData = data.map((obj) =>  obj.id === objIndex ?{ ...obj, text: value } : obj
    );
    setData(newData);
  };
  const changeStateHandler = (e) => {
    const {
      dataset: { index },
    } = e.target;
    const objIndex = data.findIndex((obj) => obj.id == index);
    const newData = data.map((obj) => {
      if (obj.id === objIndex && obj.state === "unchecked") {
          return { ...obj, state: "checked" };
      } else if (obj.id === objIndex && obj.state === "create") {
          return { ...obj, state: "unchecked" };
      }
      return obj;
    });
    console.log(newData);

    setData(newData);
  };
  const deleteTodo = (e) => {
  const {dataset: {index}} = e.target
  console.log(index);
  const newData = data.filter((obj) => obj.id != index) 
    // setData((current) =>
    //   current.filter((obj) => obj.id !== index)
    // ); 
    console.log(newData);
    setData(newData)
  }
  return (
    <>
      <div className="container">
        <List
          data={data}
          inputChange={inputChange}
          onClickState={changeStateHandler}
          deleteTodo={deleteTodo}
        ></List>
      </div>
    </>
  );
}

export default App;
