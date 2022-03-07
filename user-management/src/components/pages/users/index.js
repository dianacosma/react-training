import { useEffect, useState } from "react";
import withServices from "../../../common/hocs/withServices";
import UserService from "../../../common/services/UserService";

const UsersOverview = ({ services: [userService] }) => {
  const [users, setUsers] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    userService
      .getAll()
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  const deleteUser = (userId) => {
    setDeleteLoading(true);
    userService
      .delete(userId)
      .then(() => {
        setDeleteLoading(false);
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((err) => {
        setDeleteLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.gender}</div>
            <div>{user.status}</div>
            <button
              disabled={deleteLoading}
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default withServices([UserService], UsersOverview);
