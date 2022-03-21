import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withServices from "../../../common/hocs/withServices";
import UserService from "../../../common/services/UserService";

const UserDetails = ({ services: [userService] }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      userService
        .getOne(params.id)
        .then((result) => {
          setUserDetails(result);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [params]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <div>{userDetails?.name}</div>
      <div>{userDetails?.email}</div>
      <div>{userDetails?.gender}</div>
      <div>{userDetails?.status}</div>
    </div>
  );
};

export default withServices([UserService], UserDetails);
