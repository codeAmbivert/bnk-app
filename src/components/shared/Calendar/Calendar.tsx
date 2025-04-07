import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "../../../../public/icons/iconsExport";

interface CalendarProps {
  onClose?: () => void;
  onChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onClose, onChange }) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  // State to manage the current month and year
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // Start with the current date
  // State to manage the selected date (default to today's date)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Default to today's date

  // Days of the week
  const daysOfWeek: string[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  // Function to get the number of days in a month
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Function to generate the dates array for the current month
  const generateDates = (): string[] => {
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth();
    const daysInMonth: number = getDaysInMonth(year, month);
    const firstDay: number = getFirstDayOfMonth(year, month);

    // Adjust firstDay to make Monday the first day (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
    const adjustedFirstDay: number = (firstDay + 6) % 7;

    // Create an array with empty strings for days before the 1st
    const dates: string[] = Array(adjustedFirstDay).fill("");

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i.toString());
    }

    // Fill the rest of the grid with empty strings to make it a 5x7 or 6x7 grid
    const totalCells: number = dates.length > 35 ? 42 : 35; // 6 rows if needed, otherwise 5
    while (dates.length < totalCells) {
      dates.push("");
    }

    return dates;
  };

  // Function to handle previous month navigation
  const handlePrevMonth = (): void => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
    setSelectedDate(null); // Reset selected date when changing months
  };

  // Function to handle next month navigation
  const handleNextMonth = (): void => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
    setSelectedDate(null); // Reset selected date when changing months
  };

  // Function to handle date selection
  const handleDateClick = (date: string): void => {
    if (!date) return; // Ignore clicks on empty cells
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth();
    setSelectedDate(new Date(year, month, parseInt(date)));
  };

  // Get the month name
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName: string = monthNames[currentDate.getMonth()];
  const year: number = currentDate.getFullYear();

  // Generate the dates for the current month
  const dates: string[] = generateDates();

  // Check if the date is the selected date
  const isSelectedDate = (date: string): boolean => {
    if (!date || !selectedDate) return false;
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth();
    const dateObj: Date = new Date(year, month, parseInt(date));
    return (
      dateObj.getDate() === selectedDate.getDate() &&
      dateObj.getMonth() === selectedDate.getMonth() &&
      dateObj.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      if (onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      onChange(selectedDate); // Call the onChange function with the selected date
    }
  }, [selectedDate, onChange]);

  return (
    <div
      ref={calendarRef}
      className="bg-white rounded-xl shadow-lg pt-2 sm:p-6 w-full absolute top-full mt-1 left-0 z-[100]"
    >
      <div className=" p-4 max-w-[344.60px] mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <ArrowLeft onClick={handlePrevMonth} />
          <h2 className="text-sm font-semibold">{`${monthName} ${year}`}</h2>
          <ArrowRight onClick={handleNextMonth} />
        </div>

        {/* Days of the Week */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
          {daysOfWeek.map((day: string, index: number) => (
            <div
              key={index}
              className="text-xs sm:text-sm font-medium text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mt-2">
          {dates.map((date: string, index: number) => (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`p-2 text-xs rounded-full cursor-pointer transition-colors aspect-square flex items-center justify-center ${
                isSelectedDate(date)
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              } ${!date ? "invisible cursor-default" : ""}`}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
