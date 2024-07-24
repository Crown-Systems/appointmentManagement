import dynamic from 'next/dynamic';
import Layout from '../../../app/components/admin/layout/LayoutComponent';

// Server Component:
const Appointment = dynamic(() => import('../../../app/components/admin/appointment/Appointment'))

export default function Dashboard() {
    return (
        <Layout>
            <Appointment />
        </Layout>
    )
}
