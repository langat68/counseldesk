import React, { useState } from "react";
import {
    User,
    Bell,
    Shield,
    Palette,
    Save,
    Mail,
    Phone,
    Building,
} from "lucide-react";
import styles from "./Settings.module.scss";

const Settings: React.FC = () => {
    const [profile, setProfile] = useState({
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@legallens.com",
        phone: "+1 (555) 123-4567",
        title: "Partner",
        firm: "Smith & Associates Law Firm",
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        pushNotifications: true,
        caseUpdates: true,
        clientMessages: true,
        deadlineReminders: true,
        weeklyReports: false,
    });

    const [preferences, setPreferences] = useState({
        darkMode: false,
        compactView: false,
        autoSave: true,
        showTips: true,
    });

    return (
        <div className={styles.settings}>
            {/* Header */}
            <header className={styles.header}>
                <h1>Settings</h1>
                <p>Manage your account and application preferences</p>
            </header>

            <div className={styles.grid}>
                {/* Profile Settings */}
                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        <User size={18} className={styles.icon} />
                        Profile Information
                    </h2>
                    <div className={styles.cardContent}>
                        <div className={styles.twoCol}>
                            <div className={styles.field}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    value={profile.firstName}
                                    onChange={(e) =>
                                        setProfile({ ...profile, firstName: e.target.value })
                                    }
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
                                    value={profile.lastName}
                                    onChange={(e) =>
                                        setProfile({ ...profile, lastName: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">Email Address</label>
                            <div className={styles.inputIcon}>
                                <Mail size={16} className={styles.iconLeft} />
                                <input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) =>
                                        setProfile({ ...profile, email: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="phone">Phone Number</label>
                            <div className={styles.inputIcon}>
                                <Phone size={16} className={styles.iconLeft} />
                                <input
                                    id="phone"
                                    value={profile.phone}
                                    onChange={(e) =>
                                        setProfile({ ...profile, phone: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="title">Job Title</label>
                            <input
                                id="title"
                                value={profile.title}
                                onChange={(e) =>
                                    setProfile({ ...profile, title: e.target.value })
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="firm">Law Firm</label>
                            <div className={styles.inputIcon}>
                                <Building size={16} className={styles.iconLeft} />
                                <input
                                    id="firm"
                                    value={profile.firm}
                                    onChange={(e) =>
                                        setProfile({ ...profile, firm: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <button className={styles.primaryBtn}>
                            <Save size={16} className={styles.icon} />
                            Update Profile
                        </button>
                    </div>
                </section>

                {/* Notifications */}
                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        <Bell size={18} className={styles.icon} />
                        Notifications
                    </h2>
                    <div className={styles.cardContent}>
                        {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className={styles.toggleRow}>
                                <div>
                                    <p className={styles.label}>{key}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) =>
                                        setNotifications({
                                            ...notifications,
                                            [key]: e.target.checked,
                                        })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Preferences */}
                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        <Palette size={18} className={styles.icon} />
                        App Preferences
                    </h2>
                    <div className={styles.cardContent}>
                        {Object.entries(preferences).map(([key, value]) => (
                            <div key={key} className={styles.toggleRow}>
                                <p className={styles.label}>{key}</p>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) =>
                                        setPreferences({ ...preferences, [key]: e.target.checked })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security */}
                <section className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        <Shield size={18} className={styles.icon} />
                        Security & Privacy
                    </h2>
                    <div className={styles.cardContent}>
                        <button className={styles.outlineBtn}>Change Password</button>
                        <button className={styles.outlineBtn}>Two-Factor Authentication</button>
                        <button className={styles.outlineBtn}>Active Sessions</button>
                        <button className={styles.outlineBtn}>Data Export</button>
                        <button className={`${styles.outlineBtn} ${styles.dangerBtn}`}>
                            Delete Account
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;
