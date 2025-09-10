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
import styles from "./CalendarView.module.scss";

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

const AppointmentTypeClass: Record<string, string> = {
    consultation: "consultation",
    hearing: "hearing",
    deposition: "deposition",
    meeting: "meeting",
};

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
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Calendar</h1>
                    <p className={styles.subtitle}>Schedule and manage appointments</p>
                </div>
                <button className={styles.primaryButton}>
                    <Plus size={16} />
                    New Appointment
                </button>
            </div>

            <div className={styles.layout}>
                {/* Calendar */}
                <div className={styles.calendarWrapper}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>{format(currentDate, "MMMM yyyy")}</h2>
                            <div className={styles.navButtons}>
                                <button onClick={prevMonth}>
                                    <ChevronLeft size={16} />
                                </button>
                                <button onClick={nextMonth}>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className={styles.weekdays}>
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>

                        <div className={styles.daysGrid}>
                            {daysInMonth.map((day) => {
                                const dayAppointments = getAppointmentsForDate(day);
                                const isSelected = isSameDay(day, selectedDate);
                                const isTodayDate = isToday(day);

                                return (
                                    <button
                                        key={day.toISOString()}
                                        onClick={() => setSelectedDate(day)}
                                        className={`${styles.dayCell} ${isSelected ? styles.selected : ""
                                            } ${isTodayDate && !isSelected ? styles.today : ""}`}
                                    >
                                        <div>{format(day, "d")}</div>
                                        {dayAppointments.length > 0 && (
                                            <div className={styles.appointmentDots}>
                                                {dayAppointments.slice(0, 2).map((_, idx) => (
                                                    <span key={idx} className={styles.dot}></span>
                                                ))}
                                                {dayAppointments.length > 2 && (
                                                    <span className={styles.more}>
                                                        +{dayAppointments.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className={styles.sidebar}>
                    {/* Selected Date */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>
                                <CalendarIcon size={18} />{" "}
                                {format(selectedDate, "EEEE, MMMM d")}
                            </h3>
                        </div>
                        <div className={styles.cardBody}>
                            {selectedDateAppointments.length > 0 ? (
                                <div className={styles.appointmentsList}>
                                    {selectedDateAppointments.map((apt) => (
                                        <div key={apt.id} className={styles.appointmentCard}>
                                            <div className={styles.appointmentHeader}>
                                                <h4>{apt.title}</h4>
                                                <span
                                                    className={`${styles.badge} ${styles[
                                                        AppointmentTypeClass[
                                                        apt.type as keyof typeof AppointmentTypeClass
                                                        ]
                                                        ]
                                                        }`}
                                                >
                                                    {apt.type}
                                                </span>
                                            </div>
                                            <p className={styles.description}>{apt.description}</p>
                                            <div className={styles.meta}>
                                                <div>
                                                    <Clock size={14} />{" "}
                                                    {format(apt.date, "h:mm a")} ({apt.duration} min)
                                                </div>
                                                <div>
                                                    <MapPin size={14} /> {apt.location}
                                                </div>
                                                <div>
                                                    <Users size={14} /> {apt.attendees.join(", ")}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.empty}>
                                    <CalendarIcon size={40} />
                                    <p>No appointments scheduled</p>
                                    <button className={styles.secondaryButton}>
                                        <Plus size={14} /> Schedule Meeting
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upcoming */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>Upcoming</h3>
                        </div>
                        <div className={styles.cardBody}>
                            {mockAppointments.slice(0, 3).map((apt) => (
                                <div key={apt.id} className={styles.upcomingItem}>
                                    <div className={styles.upcomingIcon}>
                                        <CalendarIcon size={16} />
                                    </div>
                                    <div>
                                        <p className={styles.upcomingTitle}>{apt.title}</p>
                                        <p className={styles.upcomingDate}>
                                            {format(apt.date, "MMM d, h:mm a")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
