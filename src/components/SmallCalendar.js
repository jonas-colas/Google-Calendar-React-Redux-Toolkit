import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getMonth } from '../util';
import GlobalContext from '../context/GlobalContext';
import { Fragment } from 'react';

const SmallCalendar = () => {
  const { 
    monthIndex, 
    setSmallCalendarMonth, 
    selectedDay, 
    setSelectedDay 
  } = useContext(GlobalContext);

  const [currenMonthIndex, setCurrenMonthIndex] = useState(dayjs().month());
  const [currenMonth, setCurrenMonth] = useState(getMonth());

  useEffect(() => {
    setCurrenMonth(getMonth(currenMonthIndex));
  }, [currenMonthIndex]);

  useEffect(() => {
    setCurrenMonthIndex(monthIndex);
  }, [monthIndex]);

  const getCurrentDayClass = (day) => {
    const format = "DD-MM-YY";
    const today = dayjs().format(format);
    const slctDay = selectedDay && selectedDay.format(format);
    if (today === day.format(format)) {
      return 'bg-blue-500 rounded-full text-white';
    }else if(slctDay === day.format(format)) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold';
    }
    return '';
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currenMonthIndex)).format('MMMM YYYY')}
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
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currenMonth.map((week, index) => (
          <Fragment key={index}>
            {week.map((day, idx) => (
              <button key={idx} className={`py-1 w-full ${getCurrentDayClass(day)}`} 
                onClick={() => {
                  setSmallCalendarMonth(currenMonthIndex)
                  setSelectedDay(day);
                }}
              >
                <span className="text-xs text-center">
                  {day.format('D')}
                </span>
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default SmallCalendar