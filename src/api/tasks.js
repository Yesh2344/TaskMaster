import axiosInstance from '../utils/axiosInstance';

/**
 * Fetches the list of tasks for the authenticated user.
 * @returns {Promise<Array>} Array of task objects
 */
export async function fetchTasks() {
  try {
    const response = await axiosInstance.get('/todos?_limit=10');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Unable to load tasks.');
  }
}

/**
 * Creates a new task.
 * @param {Object} task
 * @returns {Promise<Object>} Created task
 */
export async function createTask(task) {
  try {
    const response = await axiosInstance.post('/todos', task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Unable to create task.');
  }
}

/**
 * Deletes a task by ID.
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteTask(id) {
  try {
    await axiosInstance.delete(`/todos/${id}`);
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw new Error('Unable to delete task.');
  }
}