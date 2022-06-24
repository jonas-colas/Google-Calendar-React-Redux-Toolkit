export const today = new Date();

function digit(num) {
  return num.toString().padStart(2, '0');
}

export const dateMonthYear = (d) => {
  const date = digit(new Date(d).getDate());
  const month = digit(new Date(d).getMonth() +1);
  const year = digit(new Date(d).getFullYear().toString().substr(-2));
  return (`${date}-${month}-${year}`);
}

export const monthYear = (y, m) => {
  const d = new Date(y, m)
  const month = new Date(d).getMonth();
  const year = new Date(d).getFullYear();
  return (`${monthList[month]} ${year}`);
}

export const dayMonthDate = (d) => {
  const date = digit(new Date(d).getDate());
  const day = new Date(d).getDay();
  const month = new Date(d).getMonth();
  return (`${dayList[day]}, ${monthList[month]} ${date}`);
}

export const getMonth = (d) => {
  const month = new Date(d).getMonth();
  return monthList[month];
}

export const getMonthNum = (d) => {
  return new Date(d).getMonth();
}

export const getYear = (d) => {
  return new Date(d).getFullYear();
}

export const getWeekday = (d) => {
  const week = new Date(d).getDay();
  return dayList[week].substring(0, 3);
}

export const getDate = (d) => {
  return new Date(d).getDate();
}

export function pickMonth(month = getMonthNum(today)) {
  const year = getYear(today);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  let currentMonthCount = 0 - firstDayOfMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      const pm =  new Date(year, month, currentMonthCount).toGMTString();
      return pm;
    });
  });
  return daysMatrix;
};

// export const convert = (obj) => {
//   return JSON.stringify(obj);
// }

// function initEvents() {
//   const eventStorages = localStorage.getItem('allEvents');
//   const parsedEvents = eventStorages ? JSON.parse(eventStorages) : [];
//   return parsedEvents;
// }

// const [storedEvents, dispatchEvent] = useReducer(eventsReducer, [], initEvents);

// useEffect(() => {
//   localStorage.setItem('allEvents', JSON.stringify(storedEvents));
// }, [storedEvents]);

export const dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];;

export const monthList = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ];

export const labels = [
  { id: 1, circle: "bg-indigo-500", bg: "bg-indigo-200" },
  { id: 2, circle: "bg-green-500",  bg: "bg-green-200" },
  { id: 3, circle: "bg-gray-500",   bg: "bg-gray-200" },
  { id: 4, circle: "bg-red-500",    bg: "bg-red-200" },
  { id: 5, circle: "bg-purple-500", bg: "bg-purple-200" },
  { id: 5, circle: "bg-blue-500",   bg: "bg-blue-200" },
  { id: 7, circle: "bg-yellow-500", bg: "bg-yellow-200" },
];            
        