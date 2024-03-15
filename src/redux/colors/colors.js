const initialState = [
  "transparent",
  "black",
  "white",
  "gray",
  "emerald",
  "yellow",
  "green",
  "teal",
  "indigo",
  "purple",
  "pink",
];

export default function colors(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
