import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './signup.module.scss';

const prisma = new PrismaClient();

async function newProfile(email, password, name) {
    const clientRole = await prisma.role.findUnique({
        where: { name: 'client' },
    });

    const user = await prisma.user.create({
        data: {
            email,
            password,
            name,
            roles: {
                create: {
                    role: {
                        connect: { id: clientRole.id },
                    },
                },
            },
        },
    });

    return user;
}

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        newProfile(formData.email, formData.password, formData.username);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.signupContainer}>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>

            </div>
        </div>
    );
};

export default SignUp;
