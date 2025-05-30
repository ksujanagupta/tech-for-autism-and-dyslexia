import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetches TQ score based on age, section, test name, and raw score
 * @param age - The age of the patient
 * @param section - The section of the test (verbal or performance)
 * @param name - The name of the test
 * @param rawScore - The raw score achieved on the test
 * @returns The TQ score as a number
 */
export const fetchTQScore = async (
  age: number, 
  section: string, 
  name: string, 
  rawScore: string | number
): Promise<number> => {
  try {
    const response = await api.get('/getTQScore', {
      params: {
        age,
        section,
        name,
        raw_score: rawScore
      }
    });
    
    return response.data.tq_score;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Unable to connect to the server. Please ensure the server is running.');
      }
      throw new Error(error.response?.data?.error || 'Error fetching TQ score');
    }
    throw error;
  }
};

// Health check function to verify server connection
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch (error) {
    return false;
  }
};