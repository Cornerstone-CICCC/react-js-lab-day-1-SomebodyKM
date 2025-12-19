import { useState, type ChangeEvent, type FormEvent } from "react";
import type { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

type Props = {
  onAdd: (user: User) => void;
  onUpdate: (user: User) => void;
  editingUser: User | null;
};

const UserForm = ({ onAdd, onUpdate, editingUser }: Props) => {
  const [formData, setFormData] = useState<User>({
    id: "",
    fullname: "",
    age: 0,
    education: "",
    gender: "",
    skills: [],
    bio: "",
  });

  if (editingUser && formData.id !== editingUser.id) {
    setFormData(editingUser);
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((curr) => {
        if (checked) {
          return {
            ...curr,
            skills: [...curr.skills, value],
          };
        } else {
          return {
            ...curr,
            skills: curr.skills.filter((skill) => skill !== value),
          };
        }
      });
    } else {
      setFormData((curr) => ({
        ...curr,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.fullname.trim()) {
      toast.error("Missing fullname!");
      return;
    }

    if (editingUser) {
      onUpdate(formData);
    } else {
      onAdd({ ...formData, id: uuidv4() });
    }

    setFormData({
      id: "",
      fullname: "",
      age: 0,
      education: "",
      gender: "",
      skills: [],
      bio: "",
    });
  };

  return (
    <div>
      <h3>{editingUser ? "Edit User" : "Add User"}</h3>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          maxWidth: 400,
        }}
      >
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Full name"
          required
        />

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
        >
          <option value="">Select education</option>
          <option value="Grade school">Grade school</option>
          <option value="High School">High School</option>
          <option value="College">College</option>
        </select>

        <label>
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </label>

        <label>
          Skills:
          <label>
            <input
              type="checkbox"
              name="skills"
              value="TypeScript"
              checked={formData.skills.includes("TypeScript")}
              onChange={handleChange}
            />
            TypeScript
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="React"
              checked={formData.skills.includes("React")}
              onChange={handleChange}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="Node"
              checked={formData.skills.includes("Node")}
              onChange={handleChange}
            />
            Node
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="NoSQL"
              checked={formData.skills.includes("NoSQL")}
              onChange={handleChange}
            />
            NoSQL
          </label>
        </label>

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
        ></textarea>

        <button type="submit">
          {editingUser ? "Save User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
