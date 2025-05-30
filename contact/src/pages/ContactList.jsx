import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactList.css";
import api from "../api/contacts";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 6;
  const [allContacts, setAllContacts] = useState([]);
  const [showOnlyFavourites, setShowOnlyFavourites] = useState(false);

  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get("/contacts");
        let serverContacts = response.data.map((c) => ({
          ...c,
          favourite: c.favourite === true || c.favourite === "true",
        }));
        setContacts(serverContacts);
        setAllContacts(serverContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const handleToggleFavorite = async (id) => {
    try {
      const contact = allContacts.find((c) => c.id === id);
      if (!contact) return;
      const updatedFavourite = !contact.favourite;
      await api.patch(`/contacts/${id}`, { favourite: updatedFavourite });
      const updateContactList = (list) =>
        list.map((c) =>
          c.id === id ? { ...c, favourite: updatedFavourite } : c
        );
      setContacts((prev) => updateContactList(prev));
      setAllContacts((prev) => updateContactList(prev));
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const openModal = (id) => {
    setIndexToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIndexToDelete(null);
  };

  const handleShowFavorites = (e) => {
    const isChecked = e.target.checked;
    setShowOnlyFavourites(isChecked);
    if (isChecked) {
      const filteredContacts = allContacts.filter(
        (contact) => contact.favourite
      );
      setContacts(filteredContacts);
    } else {
      setContacts(allContacts);
    }
  };

  const removeContact = async () => {
    if (indexToDelete !== null) {
      try {
        const contactToDelete = contacts.find((c) => c.id === indexToDelete);
        if (contactToDelete) {
          await api.delete(`/contacts/${contactToDelete.id}`);
          const updatedContacts = contacts.filter(
            (c) => c.id !== indexToDelete
          );
          setContacts(updatedContacts);
          setAllContacts(allContacts.filter((c) => c.id !== indexToDelete));
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
      handleCloseModal();
    }
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <Navbar />
      <style>
        {`
          .fade-in {
            animation: fadeIn 0.7s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .card-anim {
            transition: box-shadow 0.3s, transform 0.3s;
          }
          .card-anim:hover {
            box-shadow: 0 8px 24px rgba(79,140,255,0.18);
            transform: translateY(-4px) scale(1.02);
          }
          .pagination-anim {
            animation: fadeIn 0.5s;
          }
          .fade-in-empty {
            animation: fadeIn 0.7s;
          }
          /* Custom style for show-favorites checkbox */
          .show-favorites-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: 0.5rem;
          }
          .show-favorites-checkbox {
            accent-color: #4f8cff;
            width: 1.2em;
            height: 1.2em;
            cursor: pointer;
          }
          .show-favorites-label {
            font-size: 1rem;
            color: #4f8cff;
            cursor: pointer;
            user-select: none;
            margin-bottom: 0;
          }
        `}
      </style>
      <div className="container mt-4">
        <div className="container mb-4">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="d-flex gap-3 align-items-center">
                <div
                  className="flex-grow-1 search-container"
                  style={{ minWidth: "50%", position: "relative" }}
                >
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search..."
                    onChange={(e) => {
                      const filteredContacts = allContacts.filter((contact) =>
                        contact.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      );
                      setContacts(filteredContacts);
                      setCurrentPage(1);
                    }}
                    style={{
                      borderRadius: "1rem",
                      padding: "0.5rem 1.5rem 0.5rem 2.5rem",
                      background: "#f7fafc",
                      border: "2px solid #4f8cff",
                    }}
                  />
                  <i
                    className="bi bi-search search-icon"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "1rem",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  ></i>
                </div>
                <div
                  className="sort-contacts"
                  style={{ minWidth: "50%", position: "relative" }}
                >
                  <select
                    className="form-select mt-0"
                    onChange={(e) => {
                      const sortOrder = e.target.value;
                      const sortedContacts = [...contacts].sort((a, b) => {
                        if (sortOrder === "asc") {
                          return a.name.localeCompare(b.name);
                        } else if (sortOrder === "desc") {
                          return b.name.localeCompare(a.name);
                        }
                        return 0;
                      });
                      setContacts(sortedContacts);
                      setCurrentPage(1);
                    }}
                    style={{
                      borderRadius: "1rem",
                      background: "#f7fafc",
                      border: "2px solid #4f8cff",
                    }}
                  >
                    <option value=""> Sort by Name </option>
                    <option value="asc"> A-Z </option>
                    <option value="desc"> Z-A </option>
                  </select>
                </div>
                <div
                  className="flex-grow-1 sort-contacts"
                  style={{ minWidth: "50%", position: "relative" }}
                >
                  <div className="show-favorites-container">
                    <input
                      type="checkbox"
                      id="show-favorites"
                      className="show-favorites-checkbox"
                      onChange={handleShowFavorites}
                      checked={showOnlyFavourites}
                    />
                    <label
                      htmlFor="show-favorites"
                      className="show-favorites-label"
                    >
                      Favorites
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {contacts.length === 0 ? (
          <p className="fade-in-empty">No contacts found.</p>
        ) : (
          <>
            <div className="row row-cols-1 row-cols-md-2 g-3 fade-in">
              {currentContacts.map((contact) => {
                return (
                  <div className="col" key={contact.id}>
                    <div
                      className="card h-100 shadow-sm d-flex flex-row align-items-center p-2 card-anim"
                      style={{
                        borderRadius: "1rem",
                        background: "#fff",
                        color: "#222",
                      }}
                    >
                      <img
                        src={"/Dummy/" + (contact.image || "1.jpeg")}
                        alt="avatar"
                        className="rounded-circle"
                        style={{
                          width: "64px",
                          height: "64px",
                          objectFit: "cover",
                          marginRight: "1rem",
                          border: "2px solid #4f8cff",
                          background: "#f7fafc",
                        }}
                      />
                      <div className="flex-grow-1">
                        <div className="card-body p-0">
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-1">
                              <strong>Name:</strong> {contact.name}
                            </p>
                          </div>
                        </div>
                        <div className="card-footer d-flex justify-content-end flex-wrap gap-2 p-0 pt-2 border-0 bg-transparent">
                          <button
                            onClick={() => handleToggleFavorite(contact.id)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                            title={
                              contact.favourite
                                ? "Unmark Favorite"
                                : "Mark as Favorite"
                            }
                          >
                            {contact.favourite ? (
                              <FaHeart color="red" size={24} />
                            ) : (
                              <FaRegHeart color="gray" size={24} />
                            )}
                          </button>
                          <Link
                            to={`/contact-card/${contact.id}`}
                            className="btn btn-info"
                          >
                            <i className="bi bi-eye"></i> View
                          </Link>
                          <Link
                            to={`/edit-contact/${contact.id}`}
                            className="btn btn-info"
                          >
                            <i className="bi bi-pencil-square"></i> Edit
                          </Link>
                          <button
                            onClick={() => openModal(contact.id)}
                            className="btn btn-danger btn-sm w-100 w-md-auto"
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <nav className="mt-4 pagination-anim">
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item${currentPage === 1 ? " disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                  <li
                    key={idx + 1}
                    className={`page-item${
                      currentPage === idx + 1 ? " active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item${
                    currentPage === totalPages ? " disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>

      <Modal
        show={isModalOpen}
        onHide={handleCloseModal}
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            Delete Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure you want to delete this contact?
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button
            type="button"
            className="btn btn-danger w-50 w-sm-25"
            onClick={removeContact}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactList;
