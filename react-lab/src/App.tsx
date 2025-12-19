import { useState } from "react";
import type { User } from "./types/user";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

const App = () => {
  /* Your states here */
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  /* Your handlers here */
  const handleAddUser = (user: User) => {
    setUsers((curr) => [...curr, user]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((curr) =>
      curr.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );

    setEditingUser(null);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((curr) => curr.filter((user) => user.id !== id));
    setSelectedUser(null);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <UserForm
        onAdd={handleAddUser}
        onUpdate={handleUpdateUser}
        editingUser={editingUser}
      />
      <UserList
        users={users}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <UserProfile user={selectedUser} />
    </div>
  );
};

export default App;
