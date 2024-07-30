import { useRouter } from 'next/router';
import { useState } from 'react';
import prisma from '../../../app/lib/prisma';
import styles from './signup.module.scss';

async function newProfile(email, password, name) {
    try {
        const clientRole = await prisma.role.findUnique({
            where: { name: 'client' },
        });

        if (!clientRole) {
            throw new Error('Client role not found');
        }

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
    } catch (error) {
        console.error('Error creating new profile:', error);
        throw error;
    }
}

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await newProfile(formData.email, formData.password, formData.username);
            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            setError('Sign-up failed. Please try again.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.signupContainer}>
                <h1>Sign Up</h1>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>Sign-up successful! Redirecting to login...</p>}
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