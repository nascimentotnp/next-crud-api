import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2"; // Importe o SweetAlert
import api from "@/services/api";
import Menu from "@/components/Menu";

export default function Criar() {
  const router = useRouter();

  const [newUser, setNewUser] = useState({
    username: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleCreateUser = async () => {
    try {
      await api.post("/cliente", newUser);
      Swal.fire({
        icon: "success",
        title: "Usuário cadastrado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container d-flex">
      <Menu />
      <div className="user-form">
      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Fone:</label>
        <input
          type="text"
          name="phone"
          value={newUser.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="align-center">
        <button className="btn-salvar" onClick={handleCreateUser}>
          Criar Usuário
        </button>
      </div>
    </div>
    </div>
  );
}
