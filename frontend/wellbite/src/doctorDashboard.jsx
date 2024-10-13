import React, { useState, useEffect } from 'react';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    diagnosis: '',
    restrictions: '',
  });
  const [currentPatientId, setCurrentPatientId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await fetch(`http://localhost:5000/api/patients/${currentPatientId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPatient),
        });
        if (response.ok) {
          fetchPatients(); 
        }
      } else {
        const response = await fetch('http://localhost:5000/api/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPatient),
        });
        if (response.ok) {
          fetchPatients(); 
        }
      }
    } catch (error) {
      console.error('Error saving patient:', error);
    }

    setIsModalOpen(false);
    setNewPatient({
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      diagnosis: '',
      restrictions: '',
    });
    setCurrentPatientId(null);
    setIsEditing(false);
  };


  const handleEditPatient = (patient) => {
    setIsEditing(true);
    setCurrentPatientId(patient.id);
    setNewPatient(patient);
    setIsModalOpen(true);
  };

 
  const handleDeletePatient = async (patientId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${patientId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPatients(); 
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Doctor Dashboard</h2>

        {/* Add, Edit, and Delete Buttons */}
        <div className="mb-6 flex justify-start space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => {
              setIsEditing(false); 
              setIsModalOpen(true);
            }}
          >
            Add New Patient
          </button>
        </div>

        {patients.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">No</th>
                <th className="py-2 px-4 border-b text-left">Patient Name</th>
                <th className="py-2 px-4 border-b text-left">Age</th>
                <th className="py-2 px-4 border-b text-left">Diagnosis</th>
                <th className="py-2 px-4 border-b text-left">Restrictions</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{`${patient.firstName} ${patient.lastName}`}</td>
                  <td className="py-2 px-4 border-b">{patient.age}</td>
                  <td className="py-2 px-4 border-b">{patient.diagnosis}</td>
                  <td className="py-2 px-4 border-b">{patient.restrictions}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    {/* Edit Button */}
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                      onClick={() => handleEditPatient(patient)}
                    >
                      Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      onClick={() => handleDeletePatient(patient.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No patients found.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Patient' : 'Add New Patient'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={newPatient.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={newPatient.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newPatient.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newPatient.age}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Diagnosis</label>
                <input
                  type="text"
                  name="diagnosis"
                  value={newPatient.diagnosis}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Restrictions</label>
                <input
                  type="text"
                  name="restrictions"
                  value={newPatient.restrictions}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {isEditing ? 'Update Patient' : 'Add Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
