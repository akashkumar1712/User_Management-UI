import axios from 'axios';

const API_BASE = 'http://localhost:1010/api/courses'; // adjust base URL as per your backend

// Get all courses (used in Dashboard for dropdown)
const getAllCourses = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// (Optional) Get course by ID — if needed later
const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAllCourses,
  getCourseById
};
