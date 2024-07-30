import ChangePassword from '../../../app/components/admin/changePassword/ChangePassword';
import CreateUser from '../../../app/components/admin/createUser/CreateUser';
import NotificationSetting from '../../../app/components/admin/notificationSetting/NotificationSetting';
import ClientLayout from '../../../app/components/client/layoutClient/LayoutComponent';
import styles from './settings.module.scss';
const SettingsPage = () => {
    return (
        <ClientLayout>
            <div className={styles.container}>
                <h1>Settings</h1>
                <div className={styles.section1}>
                    <ChangePassword />
                    <CreateUser />
                </div>
                <NotificationSetting />
            </div>
        </ClientLayout>
    );
};

export default SettingsPage;
