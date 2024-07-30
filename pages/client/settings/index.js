import ChangePassword from '../../../app/components/admin/changePassword/ChangePassword';
import CreateUser from '../../../app/components/admin/createUser/CreateUser';
import Layout from '../../../app/components/admin/layout/LayoutComponent';
import NotificationSetting from '../../../app/components/admin/notificationSetting/NotificationSetting';
import styles from './settings.module.scss';

const SettingsPage = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1>Settings</h1>
                <div className={styles.section1}>
                    <ChangePassword />
                    <CreateUser />
                </div>
                <NotificationSetting />
            </div>
        </Layout>
    );
};

export default SettingsPage;
