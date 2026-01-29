import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import { HeartPulse, ShieldCheck, Clock } from 'lucide-react';

const Landing = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <div className="flex justify-center mb-6">
                        <HeartPulse size={64} className="text-white animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                        Advanced Hospital Management System
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-blue-100 mb-8">
                        Experience world-class healthcare with our state-of-the-art digital platform. Book appointments, view records, and connect with top doctors seamlessly.
                    </p>
                    <div className="space-x-4">
                        <Link to="/login">
                            <Button variant="secondary" className="px-8 py-3 text-lg font-bold">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button className="px-8 py-3 text-lg font-bold bg-white text-indigo-700 hover:bg-gray-100">
                                Register as Patient
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
                        <div className="flex justify-center text-indigo-600 mb-4"><Clock size={40} /></div>
                        <h3 className="text-xl font-bold mb-2">Instant Appointments</h3>
                        <p className="text-gray-600">Book your visit in seconds without waiting in queues.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
                        <div className="flex justify-center text-indigo-600 mb-4"><ShieldCheck size={40} /></div>
                        <h3 className="text-xl font-bold mb-2">Secure Records</h3>
                        <p className="text-gray-600">Your medical history is encrypted and safe with us.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
                        <div className="flex justify-center text-indigo-600 mb-4"><HeartPulse size={40} /></div>
                        <h3 className="text-xl font-bold mb-2">Expert Care</h3>
                        <p className="text-gray-600">Access to highly qualified doctors and specialists.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
