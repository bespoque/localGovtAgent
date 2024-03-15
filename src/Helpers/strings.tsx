export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const CapitalizeWord = (text: string) => {
  let str2=""
  if (text && text.trim() !== "") {
    const convertTolowerCase = text.toLowerCase();
    str2 =
      convertTolowerCase.charAt(0).toUpperCase() + convertTolowerCase.slice(1);
  }

  return str2;
};
