import styles from './notificationSetting.module.scss';

const NotificationSettings = () => {
    return (
        <div className={styles.container}>
            <h2>Notification Settings</h2>
            <form>
                <label>
                    <input type="checkbox" />
                    Email Notifications
                </label>
                <label>
                    <input type="checkbox" />
                    SMS Notifications
                </label>
                <label>
                    <input type="checkbox" />
                    Push Notifications
                </label>
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default NotificationSettings;
