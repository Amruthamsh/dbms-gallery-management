import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

const CalendarSelect = ({ selectedDate, handleDateChange }) => {
  return (
    <div>
      <h2>Select Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default CalendarSelect;
