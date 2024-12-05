import React, { useState, useEffect } from "react";
import { getPermissions } from "../../api/mockApi";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const PermissionsToggle = ({ currentPermissions, onPermissionsChange }) => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const data = await getPermissions();
      setPermissions(data);
      setSelectedPermissions(currentPermissions);
    };
    fetchPermissions();
  }, [currentPermissions]);

  const handlePermissionChange = (permission) => {
    const newSelectedPermissions = selectedPermissions.includes(permission)
      ? selectedPermissions.filter((p) => p !== permission)
      : [...selectedPermissions, permission];
    setSelectedPermissions(newSelectedPermissions);
    onPermissionsChange(newSelectedPermissions);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Permissions</h3>
      <div style={styles.permissionsGrid}>
        {permissions.map((permission) => (
          <div
            key={permission}
            style={styles.permissionItem}
            onClick={() => handlePermissionChange(permission)}
          >
            {selectedPermissions.includes(permission) ? (
              <FaCheckSquare style={styles.checkedIcon} />
            ) : (
              <FaRegSquare style={styles.uncheckedIcon} />
            )}
            <span style={styles.permissionText}>{permission}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "15px",
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  permissionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
  },
  permissionItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  permissionText: {
    marginLeft: "10px",
    fontSize: "1rem",
    color: "#555",
  },
  checkedIcon: {
    color: "#28a745",
    fontSize: "1.2rem",
  },
  uncheckedIcon: {
    color: "#ccc",
    fontSize: "1.2rem",
  },
};

export default PermissionsToggle;
