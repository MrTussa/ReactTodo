import { createSlice } from '@reduxjs/toolkit';
const data = localStorage.getItem("todoReact") === null ?
  [
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
  ] : JSON.parse(localStorage.getItem("todoReact"))
const initialState = {
  category: [
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
  ],
  data,
  filteredData: [],
  select: "",
  text: "",
  list: [
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
  ],
  open: false,
  openForm: false,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setCategoryState: (state, action) => {
      const index = action.payload;
      const objIndex = state.category.findIndex((obj) => obj.id === parseInt(index));
      if (state.category[objIndex].state === false) {
        state.category = state.category.map((item) => ({
          ...item,
          state: item.id === objIndex ? !item.checked : false,
        }));
      } else {
        state.category = state.category.map((item) => ({
          ...item,
          state: false,
        }));
      }
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    inputChange: (state, action) => {
      const { value, index } = action.payload;
      const objIndex = state.data.findIndex((obj) => obj.id === parseInt(index));
      state.data = state.data.map((obj) =>
        obj.id === objIndex ? { ...obj, text: value } : obj
      );
      console.log(state.data);
      console.log(state.filteredData);
    },
    changeStateHandler: (state, action) => {
      const index = action.payload;
      const objIndex = state.data.findIndex((obj) => obj.id === parseInt(index));
      state.data = state.data.map((obj) => {
        if (obj.id === objIndex) {
          return {
            ...obj,
            state: obj.state === "unchecked" ? "checked" : "unchecked",
          };
        }
        return obj;
      });
    },
    deleteTodo: (state, action) => {
      const index = action.payload;
      const objIndex = state.data.findIndex((obj) => obj.id === parseInt(index));
      state.data = state.data.map((obj) =>
        obj.id === objIndex && obj.state !== "removed"
          ? { ...obj, state: "removed" }
          : obj
      );
    },
    onClickItem: (state, action) => {
      const id = action.payload;
      const newArray = state.list.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : { ...item, checked: false }
      );
      state.list = newArray;
      state.open = false
    },
    dropdownHandler: (state) => {
      state.open = !state.open;
    },
  },
});

export const {
  setCategoryState,
  setData,
  setFilteredData,
  setOpen,
  inputChange,
  changeStateHandler,
  deleteTodo,
  onClickItem,
  dropdownHandler,
} = todoSlice.actions;

export default todoSlice.reducer;