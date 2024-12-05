import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { FaUserTag } from "react-icons/fa";
import PermissionsToggle from "../Permissions/PermissionsToggle";

const AddRoleModal = ({ onClose, onAddRole }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const handleSubmit = () => {
    if (roleName.trim()) {
      const newRole = { id: Date.now(), name: roleName, permissions };
      onAddRole(newRole);
      setRoleName("");
      setPermissions([]);
      onClose();
    } else {
      alert("Please provide a valid role name.");
    }
  };

  return (
    <Modal show onHide={onClose} centered animation>
      <Modal.Header closeButton>
        <Modal.Title style={styles.modalTitle}>
          <FaUserTag style={styles.icon} /> Add New Role
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Role Name Input */}
          <Form.Group className="mb-4" style={styles.formGroup}>
            <Form.Label>Role Name</Form.Label>
            <InputGroup>
              <InputGroup.Text style={styles.inputIcon}>
                <FaUserTag />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                style={styles.input}
              />
            </InputGroup>
          </Form.Group>

          {/* Permissions Toggle */}
          <Form.Group style={styles.formGroup}>
            <Form.Label>Permissions</Form.Label>
            <PermissionsToggle
              currentPermissions={permissions}
              onPermissionsChange={setPermissions}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={onClose}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit} style={styles.addButton}>
          Add Role
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const styles = {
  modalTitle: {
    fontSize: "1.5rem",
    color: "#495057",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "1.2rem",
    color: "#17a2b8",
  },
  formGroup: {
    marginBottom: "20px",
  },
  inputIcon: {
    backgroundColor: "#e9ecef",
    border: "1px solid #ced4da",
    color: "#6c757d",
  },
  input: {
    borderRadius: "0 0.25rem 0.25rem 0",
    border: "1px solid #ced4da",
  },
  cancelButton: {
    fontWeight: "bold",
    padding: "10px 20px",
  },
  addButton: {
    fontWeight: "bold",
    padding: "10px 20px",
  },
};

export default AddRoleModal;
