import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Form } from "react-bootstrap";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const AdminPage = () => {
  const { data } = useGetUsersQuery();
  console.log(data);

  const [keyword, setKeyword] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  const searchHandler = (e) => {
    const enteredText = e.target.value;
    setKeyword(enteredText);
    console.log(keyword);

    const filtered = data.filter((user) =>
      Object.values(user).some((value) => value.toLowerCase().includes(enteredText.toLowerCase()))
    );

    setFilteredUsers(filtered);
    console.log(filteredUsers);
  };

  // const selectHandler = (e) => {
  //   let isSelected = e.target.checked;
  //   let checkValue = parseInt(e.target.value);

  //   if (isSelected) {
  //     setSelectedUsers([...selectedUsers, checkValue]);
  //   } else {
  //     setSelectedUsers((prevData) => {
  //       return prevData.filter((id) => {
  //         return id !== checkValue;
  //       });
  //     });
  //   }
  // };

  const selectHandler = (e) => {
    const { value, checked } = e.target;
    // console.log(value);

    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  };

  const [deleteUser] = useDeleteUserMutation();

  const deleteSelected = async () => {
    if (window.confirm("Are you sure you want to all selected users?")) {
      try {
        isChecked.map((id) => deleteUser(id));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      <Form className="d-flex my-3">
        <Form.Control
          type="text"
          name="filter"
          onChange={searchHandler}
          value={keyword}
          placeholder="Search Users..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button variant="danger" className="btn-sm ms-3" onClick={deleteSelected}>
          <FaRegTrashAlt style={{ color: "white" }} />
        </Button>
      </Form>
      <Table bordered hover responsive className="table-sm">
        <thead className="table-dark">
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers &&
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    value={user.id}
                    checked={user.isChecked}
                    onChange={(e) => selectHandler(e)}
                  />
                </td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.role}</td>
                <td>
                  <LinkContainer
                    to={`/admin/user/${user._id}/edit`}
                    style={{ marginRight: "10px" }}
                  >
                    <Button variant="light" className="btn-sm">
                      <FaRegEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaRegTrashAlt className="text-danger" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminPage;
