import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserList from "./components/UserManagement/UserList";
import RoleList from "./components/RoleManagement/RoleList";
import AddRoleModal from "./components/RoleManagement/AddRoleModal";
import EditRoleModal from "./components/RoleManagement/EditRoleModal";
import PermissionsToggle from "./components/Permissions/PermissionsToggle";

const App = () => {
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <Router>
      <div className="container">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              RBAC Management
            </Link>
            <button
  className="navbar-toggler custom-toggler"
  type="button"
  aria-controls="navbarNav"
  aria-expanded={isNavbarOpen ? "true" : "false"}
  aria-label="Toggle navigation"
  onClick={() => setIsNavbarOpen(!isNavbarOpen)}
>
  <span className="navbar-toggler-icon"></span>
</button>

            <div
              className={`collapse navbar-collapse ${
                isNavbarOpen ? "show" : ""
              }`}
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/users"
                    onClick={() => setIsNavbarOpen(false)}
                  >
                    User Management
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/roles"
                    onClick={() => setIsNavbarOpen(false)}
                  >
                    Role Management
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <h2>Welcome to RBAC Management</h2>
              </div>
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route
            path="/roles"
            element={
              <RoleList
                onAddRole={() => setShowAddRoleModal(true)}
                onEditRole={(role) => {
                  setSelectedRole(role);
                  setShowEditRoleModal(true);
                }}
              />
            }
          />
        </Routes>

        {/* Add Role Modal */}
        {showAddRoleModal && (
          <AddRoleModal
            onClose={() => setShowAddRoleModal(false)}
            onAddRole={(newRole) => {
              console.log("Role added:", newRole);
              setShowAddRoleModal(false);
            }}
          />
        )}

        {/* Edit Role Modal */}
        {showEditRoleModal && selectedRole && (
          <EditRoleModal
            role={selectedRole}
            onClose={() => setShowEditRoleModal(false)}
            onEditRole={(updatedRole) => {
              console.log("Role updated:", updatedRole);
              setShowEditRoleModal(false);
            }}
          />
        )}

        {/* Permissions Toggle component */}
        {selectedRole && (
          <PermissionsToggle
            currentPermissions={selectedRole.permissions}
            onPermissionsChange={(newPermissions) => {
              setSelectedRole({ ...selectedRole, permissions: newPermissions });
            }}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
