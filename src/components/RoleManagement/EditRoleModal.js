// src/components/RoleManagement/EditRoleModal.js
import React, { useState, useEffect } from "react";
import PermissionsToggle from "../Permissions/PermissionsToggle";

const EditRoleModal = ({ role, onClose, onEditRole }) => {
  const [roleName, setRoleName] = useState(role.name);
  const [permissions, setPermissions] = useState(role.permissions);

  useEffect(() => {
    setRoleName(role.name);
    setPermissions(role.permissions);
  }, [role]);

  const handleSubmit = () => {
    if (roleName) {
      const updatedRole = { ...role, name: roleName, permissions };
      onEditRole(updatedRole);
      setRoleName("");
      setPermissions([]);
    }
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2>Edit Role</h2>
        <div>
          <label>Role Name:</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            style={styles.input}
          />
        </div>
        <PermissionsToggle
          currentPermissions={permissions}
          onPermissionsChange={setPermissions}
        />
        <div style={styles.modalActions}>
          <button style={styles.actionButton} onClick={handleSubmit}>
            Save Changes
          </button>
          <button style={styles.actionButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    minWidth: "300px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  actionButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default EditRoleModal;
