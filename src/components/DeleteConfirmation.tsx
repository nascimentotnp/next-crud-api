import { AiFillDelete } from 'react-icons/ai';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  
}) => {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Deseja realmente excluir o usuário?</h3>
        </div>
        <div className="modal-actions">
          
          <button
            className="btn-cancel"
            onClick={onRequestClose}
          >
            Retornar
          </button>
          <button
            className="btn-confirm"
            onClick={onConfirm}
          >
           
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
