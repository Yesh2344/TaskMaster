import axiosInstance from '../utils/axiosInstance';

/**
 * Sends login credentials to the auth endpoint.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>} JWT token
 */
export async function login(email, password) {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_AUTH_URL}/login`,
      { email, password }
    );
    // ReqRes returns { token: "..." }
    return response.data.token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error(
      error.response?.data?.error || 'Failed to authenticate.'
    );
  }
}