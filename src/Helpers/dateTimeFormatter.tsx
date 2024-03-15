export const dateTimeFormatter = (rawDate: string) => {
  let check = rawDate?.replace(" ", "T");
  let wow = new Date(Date.parse(check));

  const day = wow.getDay();
  const month = wow.getMonth();
  const year = wow.getFullYear();
  let stringedMonth;

  switch (month) {
    case 1:
      stringedMonth = "Jan";
      break;
    case 2:
      stringedMonth = "Feb";
      break;
    case 3:
      stringedMonth = "Mar";
      break;
    case 4:
      stringedMonth = "Apr";
      break;
    case 5:
      stringedMonth = "May";
      break;
    case 6:
      stringedMonth = "Jun";
      break;
    case 7:
      stringedMonth = "Jul";
      break;
    case 8:
      stringedMonth = "Aug";
      break;
    case 9:
      stringedMonth = "Sep";
      break;
    case 10:
      stringedMonth = "Oct";
      break;
    case 11:
      stringedMonth = "Nov";
      break;
    case 12:
      stringedMonth = "Dec";
      break;
    default:
      stringedMonth = "";
  }

  let time = wow.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return {
    formatedDay: day,
    formatedMonth: stringedMonth,
    formattedYear: year,
    formattedTime: time,
  };
};

export const setTime = (i: string) => {
  const { formatedDay, formatedMonth, formattedYear } = dateTimeFormatter(i);
  return `${formatedMonth} ${formatedDay}, ${formattedYear}`;
};

const checkDate = (date: any) => {
   let stringDate =date.toString()
  if (stringDate.slice(-1) === 1) {
    return `${date}st`;
  } else if (stringDate.slice(-1) === 2) {
    return `${date}nd`;
  } else if (stringDate.slice(-1) === 3) {
    return `${date}rd`;
  } else {
    return `${date}th`;
  }
};

export const FulldateTimeFormatter = (rawDate: string) => {
  let check = rawDate?.replace(" ", "T");
  let wow = new Date(Date.parse(check));

  const day = wow.getDay();
  const month = wow.getMonth();
  const year = wow.getFullYear();
  let stringedMonth;

  switch (month) {
    case 1:
      stringedMonth = "January";
      break;
    case 2:
      stringedMonth = "February";
      break;
    case 3:
      stringedMonth = "March";
      break;
    case 4:
      stringedMonth = "April";
      break;
    case 5:
      stringedMonth = "May";
      break;
    case 6:
      stringedMonth = "June";
      break;
    case 7:
      stringedMonth = "July";
      break;
    case 8:
      stringedMonth = "August";
      break;
    case 9:
      stringedMonth = "September";
      break;
    case 10:
      stringedMonth = "October";
      break;
    case 11:
      stringedMonth = "November";
      break;
    case 12:
      stringedMonth = "December";
      break;
    default:
      stringedMonth = "";
  }

  let time = wow.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return {
    formatedDay: checkDate(day),
    formatedMonth: stringedMonth,
    formattedYear: year,
    formattedTime: time,
  };
};

export const FullsetTime = (i: string) => {
  const { formatedDay, formatedMonth, formattedYear } = dateTimeFormatter(i);
  return `${formatedMonth} ${formatedDay}, ${formattedYear}`;
};




// export const getArrOfYears = (startYear:any) =>{
// const currentYear = new Date().getFullYear();
// const range = (start:any) =>
//   Array.from({ length: (2022 - start) / step + 1 }, (_, i) => start + i * step);

// }