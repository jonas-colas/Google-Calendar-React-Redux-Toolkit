import { Fragment, useState } from 'react';
import Day from './Day';
import { getMonth, onlyDateOfMonth, today } from '../utils';
import { useEffect } from 'react';

const Month = ({month}) => {
  const [monthSel, setMonthSel] = useState(getMonth(today));  
  
  useEffect(() => {
    const getSelMonth = () => {
      setMonthSel(onlyDateOfMonth(month));
    };
    getSelMonth()
  }, [month]);
  
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-6 border-y">
      {month.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, index) => 
            <Day day={day} key={index} rowIndex={i} monthSel={monthSel} /> 
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default Month;