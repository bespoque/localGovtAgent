import { configActionTypes } from "./config.types";
const initialState = {
  name: "ABIRS",
  description: "ABIRS eTax Portal",
  url: "/",
  layout: "layout-1",
  collapsed: false,
  rightSidebar: false,
  backdrop: false,
};

export const config = (state = initialState, action) => {
  switch (action.type) {
    case configActionTypes.SET_CONFIG:
      return {
        ...state,
        ...action.config,
      };
    case configActionTypes.SET_CONFIG_KEY:
      return {
        ...state,
        [`${action.key}`]: action.value,
      };
    default:
      return state;
  }
};
