const roles = [
    { id: 1, name: "Admin", permissions: ["Create", "Edit", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Create", "Edit"] },
    { id: 3, name: "Viewer", permissions: ["View"] },
  ];
  
  const permissions = ["Create", "Edit", "Delete", "View"]; // Centralized permissions list
  
  const users = [
    { id: 1, name: "Alice", email: "Alice.shah@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob.shah@example.com", role: "Editor" },
    { id: 3, name: "Charlie", email: "charlie.chaplin@example.com", role: "Viewer" },
  ];
  
  // Simulate API call delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  // --- Roles API ---
  export const getRoles = async () => {
    await delay(500); // Simulate API delay
    return [...roles];
  };
  
  export const addRole = async (newRole) => {
    await delay(500); // Simulate API delay
    const id = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1;
    roles.push({ id, ...newRole });
    return { success: true, newRole: { id, ...newRole } };
  };
  
  export const updateRole = async (updatedRole) => {
    await delay(500); // Simulate API delay
    const index = roles.findIndex((role) => role.id === updatedRole.id);
    if (index !== -1) {
      roles[index] = updatedRole;
      return { success: true };
    }
    return { success: false, message: "Role not found" };
  };
  
  export const deleteRole = async (id) => {
    await delay(500); // Simulate API delay
    const index = roles.findIndex((role) => role.id === id);
    if (index !== -1) {
      roles.splice(index, 1);
      return { success: true };
    }
    return { success: false, message: "Role not found" };
  };
  
  // --- Permissions API ---
  export const getPermissions = async () => {
    await delay(500); // Simulate API delay
    return [...permissions];
  };
  
  // --- Users API ---
  export const getUsers = async () => {
    await delay(500); // Simulate API delay
    return [...users];
  };
  
  export const addUser = async (newUser) => {
    await delay(500); // Simulate API delay
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    users.push({ id, ...newUser });
    return { success: true, newUser: { id, ...newUser } };
  };
  
  export const updateUser = async (updatedUser) => {
    await delay(500); // Simulate API delay
    const index = users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      return { success: true };
    }
    return { success: false, message: "User not found" };
  };
  
  export const deleteUser = async (id) => {
    await delay(500); // Simulate API delay
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return { success: true };
    }
    return { success: false, message: "User not found" };
  };
  