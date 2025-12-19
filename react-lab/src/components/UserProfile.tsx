import type { User } from "../types/user";

type Props = {
  user: User | null;
};

const UserProfile = ({ user }: Props) => {
  if (!user) {
    return <p>No User selected</p>;
  }

  return (
    <div>
      <h3>UserProfile</h3>

      <p>
        <strong>Full Name:</strong> {user.fullname}
      </p>

      <p>
        <strong>Age:</strong> {user.age}
      </p>

      <p>
        <strong>Education:</strong> {user.education}
      </p>

      <p>
        <strong>Gender:</strong> {user.gender}
      </p>

      <p>
        <strong>Skills:</strong> {user.skills.join(", ")}
      </p>

      <p>
        <strong>Bio:</strong> {user.bio}
      </p>
    </div>
  );
};

export default UserProfile;
