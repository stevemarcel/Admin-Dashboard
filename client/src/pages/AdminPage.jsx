import { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Pagination, Row, Col } from "react-bootstrap";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useGetUsersQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const { data: users, isLoading } = useGetUsersQuery();

  const [filteredUsers, setFilteredUsers] = useState([]);

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // For Search
  const [keyword, setKeyword] = useState("");

  // For Selecting User(s)
  const [isChecked, setIsChecked] = useState([]);

  // For DELETE user(s)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  //For EDIT user info
  const [editedUser, setEditedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [roles] = useState(["member", "admin"]);

  //To prevent multiple or delayed fetch from API
  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change Page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Page Number Logic
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  // Search Handler
  const searchHandler = (e) => {
    const enteredText = e.target.value;
    setKeyword(enteredText);
    console.log(keyword);

    const filtered = users.filter((user) =>
      Object.values(user).some((value) => value.toLowerCase().includes(enteredText.toLowerCase()))
    );

    setFilteredUsers(filtered);
    console.log(filteredUsers);
  };

  // Select Handler
  const selectHandler = (e) => {
    const { name, value, checked } = e.target;

    if (name === "selectAll") {
      const allUserIdsOnCurrentPage = currentUsers.map((user) => user.id);
      setIsChecked(checked ? allUserIdsOnCurrentPage : []);
    } else {
      setIsChecked((prevChecked) =>
        checked ? [...prevChecked, value] : prevChecked.filter((id) => id !== value)
      );
    }
  };

  //Edit Handler
  const editHandler = (id) => {
    // Find the user to be edited based on the ID
    const userToEdit = filteredUsers.find((user) => user.id === id);

    // Set the edited user and show the edit modal
    setEditedUser(userToEdit);
    setShowEditModal(true);
  };

  //Close Edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedUser(null);
  };

  const confirmEditHandler = () => {
    // Find the index of the edited user in filteredUsers
    const userIndex = filteredUsers.findIndex((user) => user.id === editedUser.id);

    if (userIndex !== -1) {
      // Create a copy of filteredUsers to avoid mutating state directly
      const updatedUsers = [...filteredUsers];

      // Update the user in the copied array
      updatedUsers[userIndex] = editedUser;

      // Update filteredUsers with the new array
      setFilteredUsers(updatedUsers);

      // Close the edit modal
      handleCloseEditModal();

      toast.success("User information updated successfully.");
    }
  };
  // Delete Selected Users
  const deleteSelected = () => {
    const isAnySelectedOnCurrentPage = currentUsers.some((user) => isChecked.includes(user.id));

    if (isAnySelectedOnCurrentPage) {
      handleShowDeleteModal();
    } else {
      toast.error("Please make a selection on the current page");
    }
  };

  //Delete User By table row
  const deleteHandler = (id) => {
    setUserIdToDelete(id);
    handleShowDeleteModal();
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const confirmDeleteHandler = () => {
    if (isChecked.length > 0) {
      // Delete selected users based on isChecked
      const updatedUsers = filteredUsers.filter((user) => !isChecked.includes(user.id));
      setFilteredUsers(updatedUsers);
      setIsChecked([]);

      if (isChecked.length === 1) {
        // If only one user is selected, show a toast with the user's name
        const deletedUserName = users.find((user) => user.id === isChecked[0]).name;
        toast.success(`${deletedUserName} deleted successfully.`);
      } else {
        // If multiple users are selected, show a toast with the count
        toast.success(`${isChecked.length} user(s) deleted successfully.`);
      }
    } else if (userIdToDelete !== null) {
      // Delete individual user based on userIdToDelete
      const updatedUsers = filteredUsers.filter((user) => user.id !== userIdToDelete);
      setFilteredUsers(updatedUsers);
      setUserIdToDelete(null);

      const deletedUserName = users.find((user) => user.id === userIdToDelete).name;
      toast.success(`${deletedUserName} deleted successfully.`);
    }
    handleCloseDeleteModal();
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : (
        users && (
          <>
            <ToastContainer />
            <Row>
              <Col xs={12} md={9}>
                <Form className="d-flex">
                  <Form.Control
                    type="text"
                    name="filter"
                    onChange={searchHandler}
                    value={keyword}
                    placeholder="Search Users by Name, Email, or Role"
                    className="mr-sm-2 ml-sm-5"
                  ></Form.Control>
                  <Button className="ms-2" variant="danger" onClick={deleteSelected}>
                    <FaRegTrashAlt style={{ color: "white" }} />
                  </Button>
                </Form>
              </Col>
              <Col xs={12} md={{ span: 2, offset: 1 }}>
                <Pagination className="mt-1" size="sm">
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {pageNumbers.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPage}
                      onClick={() => paginate(number)}
                      className={number === currentPage ? "dark" : ""}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                  />
                </Pagination>
              </Col>
            </Row>
            <Table bordered hover responsive className="table-sm">
              <thead className="table-dark">
                <tr>
                  <th>
                    <input
                      name="selectAll"
                      type="checkbox"
                      value="selectAll"
                      checked={
                        currentUsers.length > 0 &&
                        currentUsers.every((user) => isChecked.includes(user.id))
                      }
                      onChange={selectHandler}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!currentUsers ? (
                  <tr>
                    <td colSpan="5">
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <input
                          type="checkbox"
                          name="selectOne"
                          value={user.id}
                          checked={isChecked.includes(user.id)}
                          onChange={selectHandler}
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>{user.role}</td>
                      <td>
                        <Button
                          variant="light"
                          className="btn-sm me-2"
                          onClick={() => editHandler(user.id)}
                        >
                          <FaRegEdit />
                        </Button>
                        <Button
                          name="deleteUser"
                          variant="light"
                          className="btn-sm"
                          onClick={() => deleteHandler(user.id)}
                        >
                          <FaRegTrashAlt className="text-danger" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

            <Pagination>
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {pageNumbers.map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}
                  className={number === currentPage ? "dark" : ""}
                >
                  {number}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
              />
            </Pagination>

            {/* ALL MODAL POPUPS */}
            {/*[1]  Modal for DELETE confirmation */}
            {editedUser && (
              <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group controlId="formRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        defaultValue={editedUser.role}
                        onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEditModal}>
                    Cancel
                  </Button>
                  <Button variant="dark" onClick={confirmEditHandler}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}

            {/*[2] Modal for DELETE confirmation */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete the selected user(s)?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmDeleteHandler}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )
      )}
    </>
  );
};

export default AdminPage;
