import React, { useEffect, useState } from 'react';

const DoctorDashboard = () => {
  // State to store the list of patients
  const [patients, setPatients] = useState([]);

  // Fetch patients from the API when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctor/patients'); // Adjust the API URL as needed
        const data = await response.json();
        if (response.ok) {
          setPatients(data);
        } else {
          alert('Failed to fetch patients');
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
        alert('Error fetching patients');
      }
    };

    fetchPatients(); // Fetch the patients when the component loads
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Doctor Dashboard</h2>

        {patients.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Patient Name</th>
                <th className="py-2 px-4 border-b text-left">Age</th>
                <th className="py-2 px-4 border-b text-left">Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td className="py-2 px-4 border-b">{patient.name}</td>
                  <td className="py-2 px-4 border-b">{patient.age}</td>
                  <td className="py-2 px-4 border-b">{patient.diagnosis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No patients found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
