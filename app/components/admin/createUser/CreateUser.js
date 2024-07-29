import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import styles from './createUser.module.scss';

const prisma = new PrismaClient();

async function createUserByAdmin(email, password, name) {
    const userRole = await prisma.role.findUnique({
        where: { name: 'user' },
    });

    const user = await prisma.user.create({
        data: {
            email,
            password,
            name,
            roles: {
                create: {
                    role: {
                        connect: { id: userRole.id },
                    },
                },
            },
        },
    });

    return user;
}

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUserByAdmin(email, password, username);
    };

    return (
        <div className={styles.container}>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
