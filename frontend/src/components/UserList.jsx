import React, { useEffect, useState } from 'react';
import UserService from '../UserService';
import UserForm from './UserForm';
import UpdateUserForm from './UpdateUserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await UserService.deleteUser(id);
    fetchUsers();
  };

  const handleUpdate = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (user) => {
    await UserService.updateUser(user._id, user);
    fetchUsers();
    setEditingUser(null);
  };

  return (
    <div className="container mx-auto mt-8">
     
      <UserForm fetchUsers={fetchUsers} />
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-start uppercase font-semibold text-sm">Serial No.</th>
              <th className="py-3 px-4 text-start uppercase font-semibold text-sm">First Name</th>
              <th className="py-3 px-4 text-start uppercase font-semibold text-sm">Last Name</th>
              <th className="py-3 px-4 text-start uppercase font-semibold text-sm">Age</th>
              <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user, index) => (
              <tr key={user._id} className="border-t">
                <td className="py-3 px-4 text-start">{index + 1}</td>
                <td className="py-3 px-4 text-start">{user.firstName}</td>
                <td className="py-3 px-4 text-start">{user.lastName}</td>
                <td className="py-3 px-4 text-start">{user.age}</td>
                <td className="py-3 px-4 flex justify-center">
                  <button
                    onClick={() => handleUpdate(user)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <UpdateUserForm user={editingUser} onUpdateUser={handleUpdateUser} />
      )}
    </div>
  );
};

export default UserList;


