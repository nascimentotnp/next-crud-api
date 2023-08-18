import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import React, { useState } from "react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    username: string;
    phone: string;
    email: string;
  };
  onUpdateUser: (updatedUser: any) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveChanges = () => {
    onUpdateUser(editedUser);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <div className="modal-content">
          <div className="modal-header">
            <ModalHeader>Atualizar</ModalHeader>
            <ModalCloseButton />
          </div>
          <ModalBody>
            <div className="modal-form-group my-2">
              <label>Nome:</label>
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-form-group">
              <label>Fone:</label>
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </div>
          </ModalBody>
          <div className="modal-actions">
            <ModalFooter>
              <button className="btn-salvar" onClick={handleSaveChanges}>
                Salvar
              </button>
            </ModalFooter>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
