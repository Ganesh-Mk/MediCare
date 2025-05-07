import React from 'react';
import {
  Calendar,
  Clock,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
  X,
  CheckCircle,
  XCircle,
  Stethoscope,
  CalendarDays
} from "lucide-react";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AppointmentDetailsModal = ({ isOpen, onClose, appointment }) => {
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  if (!isOpen || !appointment) return null;

  const {
    amount,
    cancelled,
    date,
    docData,
    isCompleted,
    payment,
    slotDate,
    slotTime,
    userData
  } = appointment;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Appointment Details</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status Badge */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center">
              <CalendarDays className="mr-2 w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700">
                {slotDateFormat(slotDate)}, {slotTime}
              </span>
            </div>
            <div>
              {cancelled ? (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <XCircle className="w-4 h-4 mr-1" /> Cancelled
                </span>
              ) : isCompleted ? (
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" /> Completed
                </span>
              ) : (
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> Scheduled
                </span>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Patient Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 border-b pb-2">Patient Information</h4>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={userData?.image}
                  alt={userData?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-medium text-gray-800">{userData?.name}</p>
                  <p className="text-sm text-gray-500">
                    {userData?.gender}, {calculateAge(userData?.dob)} years
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary mt-0.5" />
                  <span className="text-gray-600">{userData?.email}</span>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary mt-0.5" />
                  <span className="text-gray-600">{userData?.phone}</span>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <div className="text-gray-600">
                    <p>{userData?.address?.line1}</p>
                    <p>{userData?.address?.line2}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor & Appointment Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 border-b pb-2">Doctor & Appointment Details</h4>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={docData?.image}
                  alt={docData?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-medium text-gray-800">{docData?.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Stethoscope className="w-3 h-3 mr-1" />
                    <span>{docData?.speciality}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <span className="text-gray-500">Appointment Date:</span>
                    <span className="ml-1 text-gray-700">{slotDateFormat(slotDate)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Clock className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <span className="text-gray-500">Appointment Time:</span>
                    <span className="ml-1 text-gray-700">{slotTime}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <CreditCard className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <span className="text-gray-500">Payment:</span>
                    <span className="ml-1 text-gray-700">
                      {payment ? 'Online' : 'Cash'} - {currency}{amount}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <span className="text-gray-500">Booking Date:</span>
                    <span className="ml-1 text-gray-700">
                      {new Date(date).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;