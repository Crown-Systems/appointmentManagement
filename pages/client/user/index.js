// src/app/user/profile.js
import dynamic from 'next/dynamic';
import prisma from '../../../app/lib/prisma';
import styles from './user.module.scss';
const ClientLayout = dynamic(() => import('../../../app/components/client/layoutClient/LayoutComponent'));

function UserProfile({ user }) {
    if (!user) {
        return <div>No user found.</div>;
    }

    return (
        <ClientLayout>
            <div className={styles.profileContainer}>
                <h1>User Profile</h1>
                <div className={styles.userInfo}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                    <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                    <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </ClientLayout >
    );
}

export async function getServerSideProps() {
    // Fetch the first user for demonstration purposes
    const user = await prisma.user.findFirst();

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)), // Serialize Date objects
        },
    };
}

export default UserProfile;
