import React, { useState } from "react";
import {
    Calendar as CalendarIcon,
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

const CalendarView: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getAppointmentsForDate = (date: Date) =>
        mockAppointments.filter((apt) => isSameDay(apt.date, date));

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const selectedDateAppointments = getAppointmentsForDate(selectedDate);

    return (
        <div>
            {/* Header */}
            <div>
                <h1>Calendar</h1>
                <p>Schedule and manage appointments</p>
                <button>
                    <Plus size={16} /> New Appointment
                </button>
            </div>

            <div style={{ display: "flex", gap: "2rem" }}>
                {/* Calendar */}
                <div>
                    <h2>
                        {format(currentDate, "MMMM yyyy")}
                        <button onClick={prevMonth}>
                            <ChevronLeft size={16} />
                        </button>
                        <button onClick={nextMonth}>
                            <ChevronRight size={16} />
                        </button>
                    </h2>

                    {/* Weekdays */}
                    <div style={{ display: "flex" }}>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} style={{ flex: 1, textAlign: "center" }}>
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {daysInMonth.map((day) => {
                            const dayAppointments = getAppointmentsForDate(day);
                            const isSelected = isSameDay(day, selectedDate);
                            const isTodayDate = isToday(day);

                            return (
                                <button
                                    key={day.toISOString()}
                                    onClick={() => setSelectedDate(day)}
                                    style={{
                                        width: "14%",
                                        border: "1px solid #ccc",
                                        background: isSelected
                                            ? "#d1e7ff"
                                            : isTodayDate
                                                ? "#f8f9fa"
                                                : "white",
                                    }}
                                >
                                    {format(day, "d")}
                                    {dayAppointments.length > 0 && (
                                        <div>
                                            {dayAppointments.length} event(s)
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ minWidth: "300px" }}>
                    {/* Selected Date */}
                    <div>
                        <h3>
                            <CalendarIcon size={18} /> {format(selectedDate, "EEEE, MMMM d")}
                        </h3>
                        {selectedDateAppointments.length > 0 ? (
                            <ul>
                                {selectedDateAppointments.map((apt) => (
                                    <li key={apt.id}>
                                        <h4>{apt.title}</h4>
                                        <p>{apt.description}</p>
                                        <p>
                                            <Clock size={14} /> {format(apt.date, "h:mm a")} (
                                            {apt.duration} min)
                                        </p>
                                        <p>
                                            <MapPin size={14} /> {apt.location}
                                        </p>
                                        <p>
                                            <Users size={14} /> {apt.attendees.join(", ")}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>
                                <CalendarIcon size={40} />
                                <p>No appointments scheduled</p>
                                <button>
                                    <Plus size={14} /> Schedule Meeting
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Upcoming */}
                    <div>
                        <h3>Upcoming</h3>
                        <ul>
                            {mockAppointments.slice(0, 3).map((apt) => (
                                <li key={apt.id}>
                                    <CalendarIcon size={16} /> {apt.title} –{" "}
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
