import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);

  // Fetch note details by ID
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks/${id}`, {
          withCredentials: true,
        });
        setNote({
          title: response.data.task.title,
          description: response.data.task.description,
        });
      } catch (error) {
        console.error('Error fetching note:', error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
    };

    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/tasks/update/${id}`,
        {
          title: note.title,
          description: note.description,
        },
        { withCredentials: true }
      );
      navigate('/notes');
    } catch (error) {
      console.error('Error updating note:', error.response?.data || error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading note details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Update Note</h1>

        <input
          type="text"
          name="title"
          placeholder="Enter your title"
          value={note.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Update your note..."
          value={note.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateNote;
