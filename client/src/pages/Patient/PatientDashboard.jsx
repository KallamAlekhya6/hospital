import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import api from '../../services/api';
import { Calendar, User } from 'lucide-react';

const PatientDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showBookForm, setShowBookForm] = useState(false);
    const [bookingData, setBookingData] = useState({ doctorId: '', date: '', reason: '' });

    useEffect(() => {
        fetchAppointments();
        fetchDoctors();
    }, []);

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get('/appointments/my');
            setAppointments(data);
        } catch (error) {
            console.error("Failed to fetch appointments");
        }
    };

    const fetchDoctors = async () => {
        try {
            const { data } = await api.get('/users/doctors');
            setDoctors(data);
        } catch (error) {
            console.error("Failed to fetch doctors");
        }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        try {
            await api.post('/appointments', bookingData);
            setShowBookForm(false);
            fetchAppointments();
            alert('Appointment booked successfully!');
        } catch (error) {
            alert('Failed to book appointment');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                        <p className="text-gray-600">Patient Dashboard</p>
                    </div>
                    <Button onClick={logout} variant="danger">Logout</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Appointments Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-indigo-700 flex items-center">
                                    <Calendar className="mr-2" /> My Appointments
                                </h2>
                                <Button onClick={() => setShowBookForm(!showBookForm)}>
                                    {showBookForm ? 'Cancel Booking' : 'Book New Appointment'}
                                </Button>
                            </div>

                            {showBookForm && (
                                <div className="mb-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <h3 className="font-semibold mb-3">Book Appointment</h3>
                                    <form onSubmit={handleBook} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                                            <select
                                                className="w-full px-4 py-2 border rounded-lg"
                                                value={bookingData.doctorId}
                                                onChange={(e) => setBookingData({ ...bookingData, doctorId: e.target.value })}
                                                required
                                            >
                                                <option value="">-- Select Doctor --</option>
                                                {doctors.map(doc => (
                                                    <option key={doc._id} value={doc._id}>Dr. {doc.name} ({doc.specialization})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <Input
                                            type="datetime-local"
                                            label="Date & Time"
                                            value={bookingData.date}
                                            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                            required
                                        />
                                        <Input
                                            label="Reason"
                                            value={bookingData.reason}
                                            onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
                                            required
                                            placeholder="e.g., severe headache"
                                        />
                                        <Button type="submit">Confirm Booking</Button>
                                    </form>
                                </div>
                            )}

                            <div className="space-y-4">
                                {appointments.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No upcoming appointments.</p>
                                ) : (
                                    appointments.map(apt => (
                                        <div key={apt._id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-lg">Dr. {apt.doctor?.name}</p>
                                                <p className="text-sm text-gray-600">{new Date(apt.date).toLocaleString()}</p>
                                                <p className="text-sm text-gray-500 mt-1">Reason: {apt.reason}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${apt.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                                {apt.status.toUpperCase()}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile / History Section */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
                                <User className="mr-2" /> My Profile
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Name</span>
                                    <span className="font-medium">{user?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Email</span>
                                    <span className="font-medium">{user?.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Phone</span>
                                    <span className="font-medium">{user?.phone || 'N/A'}</span>
                                </div>
                            </div>
                            <Button variant="secondary" className="w-full mt-6">Edit Profile</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
// import React, { useContext, useEffect, useState } from 'react';
// import AuthContext from '../../context/AuthContext';
// import Button from '../../components/UI/Button';
// import Input from '../../components/UI/Input';
// import api from '../../services/api';
// import { Calendar, User } from 'lucide-react';

// const PatientDashboard = () => {
//     const { user, logout } = useContext(AuthContext);

//     const [appointments, setAppointments] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [showBookForm, setShowBookForm] = useState(false);

//     const [bookingData, setBookingData] = useState({
//         doctorId: '',
//         date: '',
//         reason: ''
//     });

//     useEffect(() => {
//         fetchAppointments();
//         fetchDoctors();
//     }, []);

//     // 🔹 Fetch logged-in patient's appointments
//     const fetchAppointments = async () => {
//         try {
//             const { data } = await api.get('/appointments/my');
//             setAppointments(data);
//         } catch (error) {
//             console.error('Failed to fetch appointments', error);
//         }
//     };

//     // 🔹 Fetch doctors (DoctorProfile + populated user)
//     const fetchDoctors = async () => {
//         try {
//             const { data } = await api.get('/users/doctors');
//             setDoctors(data);
//         } catch (error) {
//             console.error('Failed to fetch doctors', error);
//         }
//     };

//     // 🔹 Book appointment
//     const handleBook = async (e) => {
//         e.preventDefault();

//         try {
//             await api.post('/appointments', {
//                 doctorId: bookingData.doctorId, // DoctorProfile _id
//                 date: bookingData.date,
//                 reason: bookingData.reason,
//             });

//             setShowBookForm(false);
//             setBookingData({ doctorId: '', date: '', reason: '' });
//             fetchAppointments();

//             alert('Appointment booked successfully!');
//         } catch (error) {
//             console.error(error);
//             alert('Failed to book appointment');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             <div className="max-w-7xl mx-auto">

//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-8">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">
//                             Welcome, {user?.name}
//                         </h1>
//                         <p className="text-gray-600">Patient Dashboard</p>
//                     </div>
//                     <Button onClick={logout} variant="danger">
//                         Logout
//                     </Button>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                     {/* Appointments */}
//                     <div className="lg:col-span-2">
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <div className="flex justify-between items-center mb-6">
//                                 <h2 className="text-xl font-bold text-indigo-700 flex items-center">
//                                     <Calendar className="mr-2" /> My Appointments
//                                 </h2>
//                                 <Button onClick={() => setShowBookForm(!showBookForm)}>
//                                     {showBookForm ? 'Cancel Booking' : 'Book New Appointment'}
//                                 </Button>
//                             </div>

//                             {/* Book Appointment Form */}
//                             {showBookForm && (
//                                 <div className="mb-8 p-4 bg-indigo-50 rounded-lg border">
//                                     <h3 className="font-semibold mb-4">Book Appointment</h3>

//                                     <form onSubmit={handleBook} className="space-y-4">

//                                         {/* Doctor dropdown – FIXED */}
//                                         <div>
//                                             <label className="block text-sm font-medium mb-1">
//                                                 Select Doctor
//                                             </label>
//                                             <select
//                                                 className="w-full px-4 py-2 border rounded-lg"
//                                                 value={bookingData.doctorId}
//                                                 onChange={(e) =>
//                                                     setBookingData({ ...bookingData, doctorId: e.target.value })
//                                                 }
//                                                 required
//                                             >
//                                                 <option value="">-- Select Doctor --</option>
//                                                 {doctors.map((doc) => (
//                                                     <option key={doc._id} value={doc._id}>
//                                                         Dr. {doc.user?.name} ({doc.specialization})
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>

//                                         <Input
//                                             type="datetime-local"
//                                             label="Date & Time"
//                                             value={bookingData.date}
//                                             onChange={(e) =>
//                                                 setBookingData({ ...bookingData, date: e.target.value })
//                                             }
//                                             required
//                                         />

//                                         <Input
//                                             label="Reason"
//                                             placeholder="e.g., severe headache"
//                                             value={bookingData.reason}
//                                             onChange={(e) =>
//                                                 setBookingData({ ...bookingData, reason: e.target.value })
//                                             }
//                                             required
//                                         />

//                                         <Button type="submit">Confirm Booking</Button>
//                                     </form>
//                                 </div>
//                             )}

//                             {/* Appointment List */}
//                             <div className="space-y-4">
//                                 {appointments.length === 0 ? (
//                                     <p className="text-gray-500 text-center py-4">
//                                         No appointments found.
//                                     </p>
//                                 ) : (
//                                     appointments.map((apt) => (
//                                         <div
//                                             key={apt._id}
//                                             className="p-4 border rounded-lg flex justify-between items-center"
//                                         >
//                                             <div>
//                                                 <p className="font-semibold text-lg">
//                                                     Dr. {apt.doctor?.user?.name}
//                                                 </p>
//                                                 <p className="text-sm text-gray-600">
//                                                     {new Date(apt.date).toLocaleString()}
//                                                 </p>
//                                                 <p className="text-sm text-gray-500">
//                                                     Reason: {apt.reason}
//                                                 </p>
//                                             </div>

//                                             <span
//                                                 className={`px-3 py-1 rounded-full text-xs font-semibold
//                                                 ${
//                                                     apt.status === 'approved'
//                                                         ? 'bg-green-100 text-green-800'
//                                                         : apt.status === 'cancelled'
//                                                         ? 'bg-red-100 text-red-800'
//                                                         : 'bg-yellow-100 text-yellow-800'
//                                                 }`}
//                                             >
//                                                 {apt.status.toUpperCase()}
//                                             </span>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Profile */}
//                     <div>
//                         <div className="bg-white p-6 rounded-xl shadow-md">
//                             <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
//                                 <User className="mr-2" /> My Profile
//                             </h2>

//                             <div className="space-y-3">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-500">Name</span>
//                                     <span className="font-medium">{user?.name}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-500">Email</span>
//                                     <span className="font-medium">{user?.email}</span>
//                                 </div>
//                             </div>

//                             <Button variant="secondary" className="w-full mt-6">
//                                 Edit Profile
//                             </Button>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PatientDashboard;
