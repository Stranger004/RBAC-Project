import React, { useState, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getRoles, deleteRole } from "../../api/mockApi";
import AddRoleModal from "./AddRoleModal";
import EditRoleModal from "./EditRoleModal";
import "./RoleList.css"; // Import custom styles

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setFeedback({ message: "Failed to fetch roles.", type: "danger" });
      }
    };
    fetchRoles();
  }, []);

  const handleAddRole = (newRole) => {
    const newRoleWithId = { id: roles.length + 1, ...newRole, isManual: true };
    setRoles([...roles, newRoleWithId]);
    setShowAddModal(false);
    setFeedback({ message: "Role added successfully.", type: "success" });
  };

  const handleEditRole = (updatedRole) => {
    const updatedRoles = roles.map((role) =>
      role.id === updatedRole.id ? updatedRole : role
    );
    setRoles(updatedRoles);
    setShowEditModal(false);
    setFeedback({ message: "Role updated successfully.", type: "success" });
  };

  const handleDeleteRole = async (id) => {
    const roleToDelete = roles.find((role) => role.id === id);

    if (roleToDelete && roleToDelete.isManual) {
      setRoles(roles.filter((role) => role.id !== id));
      setFeedback({ message: "Role deleted successfully.", type: "success" });
      return;
    }

    try {
      const response = await deleteRole(id);
      if (response.success) {
        setRoles(roles.filter((role) => role.id !== id));
        setFeedback({ message: "Role deleted successfully.", type: "success" });
      } else {
        throw new Error("Failed to delete role on server.");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      setFeedback({ message: "Failed to delete role.", type: "danger" });
    }
  };

  const closeFeedback = () => setFeedback({ message: "", type: "" });

  return (
    <div className="role-management-container">
      {feedback.message && (
        <Alert variant={feedback.type} onClose={closeFeedback} dismissible>
          {feedback.message}
        </Alert>
      )}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="role-management-heading">Roles Management</h2>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          <FaPlus className="me-2" /> Add Role
        </Button>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No roles available. Click "Add Role" to create one.
                </td>
              </tr>
            ) : (
              roles.map((role, index) => (
                <tr key={role.id}>
                  <td>{index + 1}</td>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(", ") || "No Permissions"}</td>
                  <td>
                    <div className="action-buttons">
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => {
                          setCurrentRole(role);
                          setShowEditModal(true);
                        }}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {showAddModal && (
        <AddRoleModal
          onClose={() => setShowAddModal(false)}
          onAddRole={handleAddRole}
        />
      )}

      {showEditModal && currentRole && (
        <EditRoleModal
          role={currentRole}
          onClose={() => setShowEditModal(false)}
          onEditRole={handleEditRole}
        />
      )}
    </div>
  );
};

export default RoleList;
