import { useDispatch } from "react-redux";
import { useUserListQuery } from "../slices/usersApiSlice";
import TableList from "../components/TableList";

const AdminPage = () => {
  const dispatch = useDispatch();
  const userList = useUserListQuery();

  return (
    <>
      <TableList />
    </>
  );
};

export default AdminPage;
