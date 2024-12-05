import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../api/mockApi";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setShowAddModal(false);
  };

  const handleEditUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const success = await deleteUser(id);
      if (success) {
        setUsers(users.filter((user) => user.id !== id));
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center text-primary">User Management</h2>
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus className="me-2" />
          Add User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <h4>No users available</h4>
          <p>Click "Add User" to create one.</p>
        </div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div
              className={`col-md-4 mb-4 ${
                currentUser?.id === user.id ? "border-primary" : ""
              }`}
              key={user.id}
            >
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-info">
                    {user.name}{" "}
                    <span
                      className={`badge ${
                        user.role === "Admin"
                          ? "bg-danger"
                          : user.role === "Manager"
                          ? "bg-warning"
                          : "bg-info"
                      }`}
                    >
                      {user.role}
                    </span>
                  </h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm d-flex align-items-center"
                      onClick={() => {
                        setCurrentUser(user);
                        setShowEditModal(true);
                      }}
                    >
                      <FaEdit className="me-2" />
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm d-flex align-items-center"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrash className="me-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAddUser={handleAddUser}
        />
      )}
      {showEditModal && currentUser && (
        <EditUserModal
          user={currentUser}
          onClose={() => setShowEditModal(false)}
          onEditUser={handleEditUser}
        />
      )}
    </div>
  );
};

export default UserList;
