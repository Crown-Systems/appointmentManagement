import styles from './changePassword.module.scss';

const ChangePassword = () => {
    return (
        <div className={styles.container}>
            <h2>Change Password</h2>
            <form>
                <label>Current Password</label>
                <input type="password" placeholder='Enter your current password' />
                <label>New Password</label>
                <input type="password" placeholder='Enter new password' />
                <label>Confirm New Password</label>
                <input type="password" placeholder='Type your new password again' />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
