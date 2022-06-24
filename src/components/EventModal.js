import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../features/slices/modal-slice';
import {
  addEvent,
  updateEvent,
  deleteEvent,
} from '../features/slices/event-slice';
import { 
  dayMonthDate, 
  labels, 
  getHours, 
  timeToNum, 
  pickMonth 
} from '../utils';

const EventModal = () => {
  const dispatch = useDispatch();

  const selectedEvent = useSelector((state) => state.calendar.selectedEvent);
  const selectedDay = useSelector((state) => state.calendar.selectedDay);
  const monthIndex = useSelector(state => state.calendar.monthIndex);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labels.find((label) => label.id === selectedEvent.label.id)
      : labels[0]
  );
  const [hourStart, setHourStart] = useState(getHours()[0]);
  const [hourEnd, setHourEnd] = useState(getHours()[1]);
  const [borderColor, setBorderColor] = useState('border-gray-200');
  const [borderHour, setBorderHour] = useState('border-gray-300');
  const [showForm, setShowForm] = useState(false);
  const [newDay, setNewDay] = useState(selectedDay);
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
      setMonthData(pickMonth(monthIndex));
  }, [showForm]);

  const handleEvent = (e) => {
    e.preventDefault();
    if (title.length === 0 || title.length > 30) {
      setBorderColor('border-red-200');
      return;
    }

    if (timeToNum(hourStart) >= timeToNum(hourEnd)) {
      setBorderHour('border-red-300');
      return;
    }

    const event = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title,
      description,
      day: newDay,
      hourStart: hourStart,
      hourEnd: hourEnd,
      label: selectedLabel,
    };

    if (selectedEvent) {
      dispatch(updateEvent(event));
    } else {
      dispatch(addEvent(event));
    }
    dispatch(showModal());
  };


  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                className="material-icons-outlined text-gray-400 cursor-pointer text-red-500 hover:text-gray-800"
                onClick={() => {
                  dispatch(deleteEvent(selectedEvent));
                  dispatch(showModal());
                }}
              >
                delete
              </span>
            )}
            <button type="button" onClick={() => dispatch(showModal())}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <div>
              <input
                type="text"
                placeholder="Add title"
                className={`pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-0 focus:border-blue-500`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <small className="float-right text-gray-500">
                (* Max 30 chars)
              </small>
            </div>
            <span className="material-icons-outlined text-gray-400">
              calendar_today
            </span>
            {selectedEvent ? (
                <div className="grid grid-rows-2 grid-flow-col gap-x">
                  {showForm ? (
                    <select
                      onChange={(e) => setNewDay(e.target.value)}
                      className="row-span-3 text-sm rounded-lg"
                    >
                      {monthData.map((week, index) => (
                        <Fragment key={index}>
                          {week.map((day, idx) => (
                            <option key={idx} value={day} >{dayMonthDate(day)}</option>
                          ))}
                        </Fragment>
                      ))}
                    </select>
                  ) : (
                    <p className="row-span-3">{dayMonthDate(selectedDay)}</p>
                  )}
                  <span 
                    onClick={() => setShowForm(true)}
                    className="ml-2 row-span-2 material-icons-outlined text-yellow-400 cursor-pointer"
                  >
                    edit
                  </span>
                </div>
              ) : (
                <p>{dayMonthDate(selectedDay)}</p>
              ) 
            }
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <div className="flex gap-x">
              <select
                onChange={(e) => setHourStart(e.target.value)}
                className={`${borderHour} text-sm rounded-lg`}
              >
                {selectedEvent ? (
                    <option>{selectedEvent.hourStart}</option>
                  ) : (
                    <option>{hourStart}</option>
                  )
                }
                {getHours().map((h, i) => (
                  <option value={h} key={i}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setHourEnd(e.target.value)}
                className={`ml-4 ${borderHour} text-sm rounded-lg`}
              >
                {selectedEvent ? (
                    <option>{selectedEvent.hourEnd}</option>
                  ) : (
                    <option>{hourEnd}</option>
                  )
                }
                {getHours().map((h, i) => (
                  <option value={h} key={i}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              placeholder="Add description"
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-0 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labels.map((label, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(label)}
                  className={`${label.circle} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === label && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleEvent}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
