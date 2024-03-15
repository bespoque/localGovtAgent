export const getInitials = (name: any) => {
  if (!name || name.trim() === "" || name === undefined) {
    return "N/A";
  }
  let StringsWithoutSpecialCharacters = name.replace(/[^\w\s]/gi, "");
  let nameArr = StringsWithoutSpecialCharacters.split(" ");
  let formattedArray = nameArr.filter((word: string) => word !== "");
  if (formattedArray.length === 1) {
    let initials = formattedArray[0][0];
    return initials;
  } else if (formattedArray.length > 1) {
    let firstLetter = formattedArray[0][0];
    let secondLetter = formattedArray[1][0];

    return firstLetter.toUpperCase() + secondLetter.toUpperCase();
  }
};
