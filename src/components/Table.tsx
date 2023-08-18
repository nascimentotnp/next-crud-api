import api from "@/services/api";
import { useEffect, useState } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import DeleteConfirmationModal from "./DeleteConfirmation";
import EditUserModal from "./EditUserModal";
import { CgUserlane } from "react-icons/cg";
import Link from 'next/link';
import Swal from "sweetalert2";


interface Client {
    id: string;
    username: string;
    phone: string;
    email: string;

}

export default function Tabela() {

    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Client | null>(null);


    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await api.get('/cliente');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
            setClients([]);
        }
    };
    const handleRowClick = (clientId: string) => {
        setSelectedClientId(clientId);
    };

    const handleDeleteUser = async (selectedClientId: string) => {
        try {
            await api.delete(`/cliente/${selectedClientId}`);
            Swal.fire({
                icon: "success",
                title: "Usuário Excluido com sucesso!",
                showConfirmButton: false,
                timer: 1500,
              });
            fetchClients();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const openDeleteModal = (clientId: string) => {
        setSelectedClientId(clientId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedClientId(null);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (selectedClientId) {
            await handleDeleteUser(selectedClientId);
            closeDeleteModal();
        }
    };
    const handleopenEditUser = (user: Client) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };
    const handleEditUser = async (updatedUser: Client) => {
        try {
            if (selectedClientId) {
                const userWithId = { ...updatedUser, id: selectedClientId };
                await api.put(`/cliente/${selectedClientId}`, userWithId);
                Swal.fire({
                    icon: "success",
                    title: "Usuário atualizado com sucesso!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                fetchClients();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <><table className="mt-8 w-full bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-purple-900 text-yellow-400">
                <tr>
                    <th className="p-3 w-1/4">Id</th>
                    <th className="p-3 w-1/4">Username</th>
                    <th className="p-3 w-1/4">telefone</th>
                    <th className="p-3 w-1/4">email</th>
                    <th className="p-3 w-1/4">Ações</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(client => (
                    <tr
                        key={client.id}
                        className={`border-b ${selectedClientId === client.id ? 'selected-row' : ''}`}
                        onClick={() => handleRowClick(client.id)}
                    >
                        <td className="p-3">{client.id}</td>
                        <td className="p-3">{client.username}</td>
                        <td className="p-3">{client.phone}</td>
                        <td className="p-3">{client.email}</td>

                        <td className="actions">
                            <button title="Meus dados">
                                <Link href={`/clientes/${client.id}`}>
                                        <CgUserlane size="20px" />
                                </Link>
                            </button>
                            <button title="Editar usuário" onClick={() => handleopenEditUser(client)}>
                                <AiOutlineEdit size="20px" />
                            </button>
                            <button title="Excluir usuário" onClick={() => openDeleteModal(client.id)}>
                                <AiFillDelete size="20px" />
                            </button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={selectedUser ? selectedUser : { id: "", username: "", phone: "", email: "" }}
                onUpdateUser={(updatedUser) => {
                    handleEditUser(updatedUser);
                    setIsEditModalOpen(false);
                    setSelectedUser(null);
                }}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                onConfirm={handleConfirmDelete} /></>
    )
}
