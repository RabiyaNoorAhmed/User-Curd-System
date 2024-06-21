import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

const getUsers = () => axios.get(API_URL);
const createUser = (user) => axios.post(API_URL, user);
const updateUser = (id, user) => axios.patch(`${API_URL}/${id}`, user);
const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

const UserService = {
  getUsers,
  createUser,
  
  updateUser,
  deleteUser
};

export default UserService;
