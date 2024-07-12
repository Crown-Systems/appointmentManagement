import dynamic from 'next/dynamic'

// Server Component:
const Appointment = dynamic(() => import('../../app/components/admin/appointment/Appointment'))

export default function Dashboard() {
    return (
        <Appointment />
    )
}
