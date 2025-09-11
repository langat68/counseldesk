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
        <div>
            {/* Header */}
            <header>
                <h1>Settings</h1>
                <p>Manage your account and application preferences</p>
            </header>

            <div>
                {/* Profile Settings */}
                <section>
                    <h2>
                        <User size={18} /> Profile Information
                    </h2>
                    <div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                value={profile.firstName}
                                onChange={(e) =>
                                    setProfile({ ...profile, firstName: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                value={profile.lastName}
                                onChange={(e) =>
                                    setProfile({ ...profile, lastName: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Email Address</label>
                            <div>
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

                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <div>
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

                        <div>
                            <label htmlFor="title">Job Title</label>
                            <input
                                id="title"
                                value={profile.title}
                                onChange={(e) =>
                                    setProfile({ ...profile, title: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label htmlFor="firm">Law Firm</label>
                            <div>
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

                        <button>
                            <Save size={16} /> Update Profile
                        </button>
                    </div>
                </section>

                {/* Notifications */}
                <section>
                    <h2>
                        <Bell size={18} /> Notifications
                    </h2>
                    <div>
                        {Object.entries(notifications).map(([key, value]) => (
                            <div key={key}>
                                <p>{key}</p>
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
                <section>
                    <h2>
                        <Palette size={18} /> App Preferences
                    </h2>
                    <div>
                        {Object.entries(preferences).map(([key, value]) => (
                            <div key={key}>
                                <p>{key}</p>
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
                <section>
                    <h2>
                        <Shield size={18} /> Security & Privacy
                    </h2>
                    <div>
                        <button>Change Password</button>
                        <button>Two-Factor Authentication</button>
                        <button>Active Sessions</button>
                        <button>Data Export</button>
                        <button>Delete Account</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;
