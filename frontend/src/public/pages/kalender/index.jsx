import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Navbar from '../../components/navbar';
import landingpage from "../../assets/landingpage.svg";

export default function KalenderBudaya() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 18)); // September 2025

    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const calendarDays = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            calendarDays.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(day);
        }

        return calendarDays;
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const calendarDays = getDaysInMonth(currentDate);
    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const events = [
        {
            id: 1,
            title: "Judul Kegiatan",
            subtitle: "Tempat - datetime",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
        },
        {
            id: 2,
            title: "Judul Kegiatan",
            subtitle: "Tempat - datetime",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
        },
        {
            id: 3,
            title: "Judul Kegiatan",
            subtitle: "Tempat - datetime",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
        }
    ];

    return (
        <>
            <Navbar />
            <div className="flex h-screen mt-16 bg-gray-900 ">
                {/* Left Panel - Calendar */}
                <div className="bg-white shadow-lg w-80">
                    <div className="p-6">
                        <h1 className="mb-6 text-2xl font-bold text-gray-800">Kalender Budaya</h1>

                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => navigateMonth(-1)}
                                className="p-2 transition-colors rounded-full hover:bg-gray-100"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h2>
                            <button
                                onClick={() => navigateMonth(1)}
                                className="p-2 transition-colors rounded-full hover:bg-gray-100"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Days of Week Header */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {days.map(day => (
                                <div key={day} className="py-2 text-xs font-medium text-center text-gray-500">
                                    {day.substring(0, 3)}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, index) => (
                                <div
                                    key={index}
                                    className={`
                    aspect-square flex items-center justify-center text-sm cursor-pointer rounded-md transition-colors
                    ${day ? 'hover:bg-gray-100' : ''}
                    ${isToday(day) ? 'bg-blue-500 text-white font-bold' : 'text-gray-700'}
                    ${day === 18 && currentDate.getMonth() === 8 ? 'bg-orange-500 text-white font-bold' : ''}
                `}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Selected Date Info */}
                        <div className="p-3 mt-6 rounded-lg bg-gray-50">
                            <div className="text-lg font-bold text-gray-800">18 September 2025</div>
                            <div className="text-sm text-gray-600">Rabu ini ada kegiatan</div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Events */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="p-8 space-y-6">
                        {events.map((event,) => (
                            <div key={event.id} className="overflow-hidden bg-white rounded-lg shadow-sm">
                                <div className="flex">
                                    {/* Event Image */}
                                    <div className="flex-shrink-0 w-32 h-32 bg-orange-600">
                                        <img
                                            src={landingpage}
                                            alt="Landing Page"
                                            className="w-full h-full"
                                        />
                                            
                                    </div>

                                    {/* Event Details */}
                                    <div className="flex-1 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-gray-800">{event.title}</h3>
                                        <p className="mb-3 text-sm text-gray-600">{event.subtitle}</p>
                                        <p className="text-sm leading-relaxed text-gray-700">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add Event Button */}
                        <div className="flex justify-center mt-8">
                            <button className="flex items-center justify-center w-12 h-12 transition-colors bg-blue-500 rounded-full shadow-lg hover:bg-blue-600">
                                <Plus className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}