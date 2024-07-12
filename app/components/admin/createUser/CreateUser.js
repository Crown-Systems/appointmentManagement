import styles from './createUser.module.scss';

const CreateUser = () => {
    return (
        <div className={styles.container}>
            <h2>Create User</h2>
            <form>
                <label>Username</label>
                <input type="text" />
                <label>Email</label>
                <input type="email" />
                <label>Password</label>
                <input type="password" />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
