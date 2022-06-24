import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pickMonth,
  dateMonthYear,
  getDate,
  monthYear,
  getWeekday,
  today,
  getMonthNum,
  getYear,
} from '../utils';
import { daySel, smallCal } from '../features/slices/calendar-slice';

const SmallCalendar = () => {
  const dispatch = useDispatch();

  const selectedDay = useSelector(state => state.calendar.selectedDay)
  const monthIndex = useSelector(state => state.calendar.monthIndex);
  const monthSelected = useSelector(state => state.calendar.monthIndex);

  const [currenMonthIndex, setCurrenMonthIndex] = useState(getMonthNum(today));
  const [currenMonth, setCurrenMonth] = useState(pickMonth());

  useEffect(() => {
    setCurrenMonth(pickMonth(currenMonthIndex));
  }, [currenMonthIndex]);

  useEffect(() => {
    setCurrenMonthIndex(monthIndex);
  }, [monthIndex]);

  const getCurrentDayClass = (day) => {
    const slctDay = selectedDay && dateMonthYear(selectedDay);

    if (dateMonthYear(today) === dateMonthYear(day)) {
      return 'bg-blue-500 rounded-full text-white';
    } else if (slctDay === dateMonthYear(day)) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold';
    }
    return '';
  };

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {monthYear(getYear(today), currenMonthIndex)}
        </p>
        <div>
          <button onClick={() => setCurrenMonthIndex(currenMonthIndex - 1)}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={() => setCurrenMonthIndex(currenMonthIndex + 1)}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currenMonth[0].map((day, i) => (
          <span key={i} className="text-xs py-1 text-center">
            {getWeekday(day).charAt(0)}
          </span>
        ))}
        {currenMonth.map((week, index) => (
          <Fragment key={index}>
            {week.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 w-full ${getCurrentDayClass(day)}`}
                onClick={() => {
                  dispatch(smallCal(currenMonthIndex));
                  dispatch(daySel(day));
                }}
              >
                { getMonthNum(day) === monthSelected &&
                  <span className="text-xs text-center">
                    {getDate(day)}
                  </span>
                }
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
