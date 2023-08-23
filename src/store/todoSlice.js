import { createSlice } from '@reduxjs/toolkit';

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
  data: [],
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
      const { index } = action.payload;
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
    setSelect: (state, action) => {
      state.select = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setOpenForm: (state, action) => {
      state.openForm = action.payload;
    },
    addItem: (state) => {
      if (state.text === "") {
        alert("Text required");
        return;
      }
      const categoryFilter =
        state.select !== ""
          ? state.category.filter((item) => item.text === state.select)
          : [{ id: 2 }];
      const newItem = {
        id: state.data[state.data.length - 1].id + 1,
        categoryId: categoryFilter[0].id,
        text: state.text,
        state: "unchecked",
      };
      const newData = [...state.data, newItem];
      state.data = newData;
      state.filteredData = newData;
      state.select = "";
      state.text = "";
      state.openForm = !state.openForm;
    },
    inputChange: (state, action) => {
      const { value, index } = action.payload;
      const objIndex = state.data.findIndex((obj) => obj.id === parseInt(index));
      state.data = state.data.map((obj) =>
        obj.id === objIndex ? { ...obj, text: value } : obj
      );
    },
    changeStateHandler: (state, action) => {
      const { index } = action.payload;
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
      const { index } = action.payload;
      const objIndex = state.data.findIndex((obj) => obj.id === parseInt(index));
      state.data = state.data.map((obj) =>
        obj.id === objIndex && obj.state !== "removed"
          ? { ...obj, state: "removed" }
          : obj
      );
    },
    onClickItem: (state, action) => {
      const { id } = action.payload;
      const newArray = state.list.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : { ...item, checked: false }
      );
      state.list = newArray;
      const value = newArray.find((item) => item.checked)?.value;
      const filteredValue =
        value === "inProgress"
          ? "unchecked"
          : value === "completed"
          ? "checked"
          : value;
      const currentCategory = state.category.find((item) => item.state === true);
      const categoryFilter = currentCategory
        ? state.data.filter((item) => item.categoryId === currentCategory.id)
        : undefined;
      const filteredData =
        categoryFilter === undefined
          ? state.data.filter((item) => item.state === filteredValue)
          : categoryFilter.filter((item) => item.state === filteredValue);
      state.filteredData = filteredData;
      state.open = false;
    },
    dropdownHandler: (state) => {
      state.open = !state.open;
    },
    dropdownFormHandler: (state) => {
      state.openForm = !state.openForm;
    },
  },
});

export const {
  setCategoryState,
  setData,
  setFilteredData,
  setSelect,
  setText,
  setOpen,
  setOpenForm,
  addItem,
  inputChange,
  changeStateHandler,
  deleteTodo,
  onClickItem,
  dropdownHandler,
  dropdownFormHandler,
} = todoSlice.actions;

export default todoSlice.reducer;