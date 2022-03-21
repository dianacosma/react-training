import { Button, Grid, List, ListItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import TokenContext from "../../../common/contexts/tokenContext";
import withServices from "../../../common/hocs/withServices";
import UserService from "../../../common/services/UserService";

const useStyles = makeStyles(() => {
  return {
    userListContainer: {
      padding: 5,
      textAlign: "center",
    },
  };
});

const UsersOverview = ({ services: [userService] }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [deleteLoadingItem, setDeleteLoadingItem] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [userToUpdate, setUserToUpdate] = useState();
  const [updateLoading, setUpdateLoading] = useState(false);

  const [addNewUserName, setAddNewUserName] = useState("");
  const [addNewUserEmail, setAddNewUserEmail] = useState("");
  const [addNewUserGender, setAddNewUserGender] = useState("");
  const [addNewUserStatus, setAddNewUserStatus] = useState("");

  const context = useContext(TokenContext);

  const nameRef = useRef(null);

  const [displayAdd, setDisplayAdd] = useState(false);

  useEffect(() => {
    console.log(context);
  }, [context]);

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
    setDeleteLoadingItem(userId);
    userService
      .delete(userId)
      .then(() => {
        setDeleteLoadingItem(null);
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((err) => {
        setDeleteLoadingItem(null);
        console.log(err);
      });
  };

  const updateUser = () => {
    setUpdateLoading(true);
    const newUser = {
      ...userToUpdate,
      name: newUserName,
      email: newUserEmail,
    };
    userService
      .update(userToUpdate.id, newUser)
      .then((result) => {
        setUsers(
          users.map((user) => {
            if (user.id === result.id) {
              return {
                ...user,
                name: result.name,
                email: result.email,
              };
            }
            return user;
          })
        );
        setUserToUpdate(undefined);
        setNewUserEmail("");
        setNewUserName("");
        setUpdateLoading(false);
      })
      .catch((err) => {
        setUserToUpdate(undefined);
        setNewUserEmail("");
        setNewUserName("");
        setUpdateLoading(false);
        console.log(err);
      });
  };

  const addUser = () => {
    const newUser = {
      name: addNewUserName,
      email: addNewUserEmail,
      gender: addNewUserGender,
      status: addNewUserStatus,
    };
    userService
      .add(newUser)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container>
      <Grid item xs={3} lg={12}>
        <label>Add new user</label>
        <Button
          onClick={() => {
            setDisplayAdd(!displayAdd);
            nameRef.current.focus();
            console.log(nameRef);
          }}
        >
          Add user
        </Button>
        <Button
          onClick={() => {
            nameRef.current.focus();
          }}
        >
          Focus
        </Button>
      </Grid>
      <Grid item xs={3}>
        <div className={`${!displayAdd ? "add-form-invisible" : ""}`}>
          <TextField
            variant="standard"
            ref={nameRef}
            label="Name"
            value={addNewUserName}
            onChange={(e) => {
              setAddNewUserName(e.target.value);
            }}
          />
          <TextField
            label="Email"
            value={addNewUserEmail}
            onChange={(e) => {
              setAddNewUserEmail(e.target.value);
            }}
          />
          <TextField
            label="Gender"
            value={addNewUserGender}
            onChange={(e) => {
              setAddNewUserGender(e.target.value);
            }}
          />
          <TextField
            label="Status"
            value={addNewUserStatus}
            onChange={(e) => {
              setAddNewUserStatus(e.target.value);
            }}
          />
          <Button variant="contained" onClick={addUser}>
            Save
          </Button>
        </div>
      </Grid>
      <Grid item xs={6}>
        <List className={classes.userListContainer}>
          {users.map((user) => {
            return (
              <ListItem key={user.id}>
                <Link to={`users/${user.id}`}>{user.name}</Link>
                <Button
                  variant="contained"
                  disabled={deleteLoadingItem === user.id}
                  onClick={() => {
                    setNewUserName(user.name);
                    setNewUserEmail(user.email);
                    setUserToUpdate(user);
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  disabled={deleteLoadingItem === user.id}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Button>
              </ListItem>
            );
          })}
        </List>
        {userToUpdate && (
          <div>
            <input
              disabled={updateLoading}
              value={newUserName}
              placeholder="name"
              onChange={(e) => {
                setNewUserName(e.target.value);
              }}
            />
            <input
              disabled={updateLoading}
              value={newUserEmail}
              placeholder="email"
              onChange={(e) => {
                setNewUserEmail(e.target.value);
              }}
            />
            <button disabled={updateLoading} onClick={updateUser}>
              Save
            </button>
            <button
              disabled={updateLoading}
              onClick={() => {
                setUserToUpdate(undefined);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default withServices([UserService], UsersOverview);
