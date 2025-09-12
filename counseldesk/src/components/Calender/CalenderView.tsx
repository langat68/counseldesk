import React, { useState } from "react";
import {
    Calendar,
    Plus,
    Clock,
    MapPin,
    Users,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
} from "date-fns";
import "../../Styling/CalendarView.scss";

// Mock appointments
const mockAppointments = [
    {
        id: "1",
        title: "Client Consultation - Sarah Johnson",
        description: "Contract review discussion",
        date: new Date("2024-03-15T10:00:00"),
        duration: 60,
        location: "Conference Room A",
        attendees: ["Sarah Johnson", "John Smith"],
        type: "consultation",
    },
    {
        id: "2",
        title: "Court Hearing - TechCorp Case",
        description: "Patent dispute hearing",
        date: new Date("2024-03-18T14:30:00"),
        duration: 120,
        location: "Superior Court",
        attendees: ["Michael Chen", "John Smith", "Sarah Wilson"],
        type: "hearing",
    },
    {
        id: "3",
        title: "Deposition - Rodriguez Case",
        description: "Witness deposition",
        date: new Date("2024-03-22T09:00:00"),
        duration: 180,
        location: "Law Office",
        attendees: ["Emily Rodriguez", "Michael Davis"],
        type: "deposition",
    },
];

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getAppointmentsForDate = (date) =>
        mockAppointments.filter((apt) => isSameDay(apt.date, date));

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const selectedDateAppointments = getAppointmentsForDate(selectedDate);

    return (
        <div className="calendar-view">
            {/* Header */}
            <div className="calendar-header">
                <div className="header-content">
                    <h1 className="header-title">Calendar</h1>
                    <p className="header-description">Schedule and manage appointments</p>
                </div>
                <button className="new-appointment-btn">
                    <Plus size={16} /> New Appointment
                </button>
            </div>

            <div className="calendar-container">
                {/* Calendar */}
                <div className="calendar-main">
                    <div className="calendar-navigation">
                        <h2 className="month-title">
                            {format(currentDate, "MMMM yyyy")}
                        </h2>
                        <div className="nav-buttons">
                            <button className="nav-btn prev-btn" onClick={prevMonth}>
                                <ChevronLeft size={16} />
                            </button>
                            <button className="nav-btn next-btn" onClick={nextMonth}>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Weekdays */}
                    <div className="weekdays">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="weekday">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="calendar-grid">
                        {daysInMonth.map((day) => {
                            const dayAppointments = getAppointmentsForDate(day);
                            const isSelected = isSameDay(day, selectedDate);
                            const isTodayDate = isToday(day);

                            return (
                                <button
                                    key={day.toISOString()}
                                    onClick={() => setSelectedDate(day)}
                                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isTodayDate ? 'today' : ''}`}
                                >
                                    <span className="day-number">{format(day, "d")}</span>
                                    {dayAppointments.length > 0 && (
                                        <div className="day-events">
                                            {dayAppointments.length} event(s)
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="calendar-sidebar">
                    {/* Selected Date */}
                    <div className="selected-date-section">
                        <h3 className="section-title">
                            <Calendar size={18} /> {format(selectedDate, "EEEE, MMMM d")}
                        </h3>
                        {selectedDateAppointments.length > 0 ? (
                            <ul className="appointments-list">
                                {selectedDateAppointments.map((apt) => (
                                    <li key={apt.id} className="appointment-item">
                                        <h4 className="appointment-title">{apt.title}</h4>
                                        <p className="appointment-description">{apt.description}</p>
                                        <div className="appointment-details">
                                            <p className="appointment-time">
                                                <Clock size={14} /> {format(apt.date, "h:mm a")} (
                                                {apt.duration} min)
                                            </p>
                                            <p className="appointment-location">
                                                <MapPin size={14} /> {apt.location}
                                            </p>
                                            <p className="appointment-attendees">
                                                <Users size={14} /> {apt.attendees.join(", ")}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="no-appointments">
                                <Calendar size={40} className="no-appointments-icon" />
                                <p className="no-appointments-text">No appointments scheduled</p>
                                <button className="schedule-btn">
                                    <Plus size={14} /> Schedule Meeting
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Upcoming */}
                    <div className="upcoming-section">
                        <h3 className="section-title">Upcoming</h3>
                        <ul className="upcoming-list">
                            {mockAppointments.slice(0, 3).map((apt) => (
                                <li key={apt.id} className="upcoming-item">
                                    <Calendar size={16} /> {apt.title} –{" "}
                                    {format(apt.date, "MMM d, h:mm a")}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;