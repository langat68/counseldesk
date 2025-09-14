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

import "../../Styling/Settings.scss";

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
        <div className="settings">
            {/* Header */}
            <header className="settings-header">
                <h1 className="settings-title">Settings</h1>
                <p className="settings-description">
                    Manage your account and application preferences
                </p>
            </header>

            <div className="settings-content">
                {/* Profile Settings */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <User size={18} /> Profile Information
                    </h2>
                    <div className="section-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    value={profile.firstName}
                                    onChange={(e) =>
                                        setProfile({ ...profile, firstName: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
                                    value={profile.lastName}
                                    onChange={(e) =>
                                        setProfile({ ...profile, lastName: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-with-icon">
                                    <Mail size={16} />
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
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <div className="input-with-icon">
                                    <Phone size={16} />
                                    <input
                                        id="phone"
                                        value={profile.phone}
                                        onChange={(e) =>
                                            setProfile({ ...profile, phone: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Job Title</label>
                                <input
                                    id="title"
                                    value={profile.title}
                                    onChange={(e) =>
                                        setProfile({ ...profile, title: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firm">Law Firm</label>
                                <div className="input-with-icon">
                                    <Building size={16} />
                                    <input
                                        id="firm"
                                        value={profile.firm}
                                        onChange={(e) =>
                                            setProfile({ ...profile, firm: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="btn primary-btn">
                            <Save size={16} /> Update Profile
                        </button>
                    </div>
                </section>

                {/* Notifications */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <Bell size={18} /> Notifications
                    </h2>
                    <div className="section-body toggles">
                        {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className="toggle-item">
                                <span className="toggle-label">
                                    {key.replace(/([A-Z])/g, " $1")}
                                </span>
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
                <section className="settings-section">
                    <h2 className="section-title">
                        <Palette size={18} /> App Preferences
                    </h2>
                    <div className="section-body toggles">
                        {Object.entries(preferences).map(([key, value]) => (
                            <div key={key} className="toggle-item">
                                <span className="toggle-label">
                                    {key.replace(/([A-Z])/g, " $1")}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) =>
                                        setPreferences({
                                            ...preferences,
                                            [key]: e.target.checked,
                                        })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <Shield size={18} /> Security & Privacy
                    </h2>
                    <div className="section-body security-actions">
                        <button className="btn">Change Password</button>
                        <button className="btn">Two-Factor Authentication</button>
                        <button className="btn">Active Sessions</button>
                        <button className="btn">Data Export</button>
                        <button className="btn danger-btn">Delete Account</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;
