import Actions from './partials/Actions';
import CalendarComponent from './partials/Calendar';
import Title from './partials/Title';

interface ICalendarProps {
  setDate: any;
  date: any;
  selectRange: boolean;
  setSelectRange: any;
}

const CustomCalendar = (props: ICalendarProps) => {
  const { setDate, date, selectRange, setSelectRange } = props;
  return (
    <div style={{ width: '80vw', display: 'grid', placeItems: 'center' }}>
      <Title title={'Calendar'} />
      <CalendarComponent
        setDate={setDate}
        date={date}
        selectRange={selectRange}
      />
      <Actions
        setDate={setDate}
        date={date}
        selectRange={selectRange}
        setSelectRange={setSelectRange}
      />
    </div>
  );
};

export default CustomCalendar;
