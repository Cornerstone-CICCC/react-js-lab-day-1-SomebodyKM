import type { User } from "../types/user";

type Props = {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

const UserList = ({ users, onView, onEdit, onDelete }: Props) => {
  const handleView = (user: User) => {
    onView(user);
  };

  const handleEdit = (user: User) => {
    onEdit(user);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  if (users.length === 0) {
    return <p>No users yet</p>;
  }

  return (
    <div>
      <h3>User List</h3>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullname}</td>
              <td>
                <button onClick={() => handleView(user)}>View</button>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
