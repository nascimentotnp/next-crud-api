import Menu from '@/components/Menu';
import api from '@/services/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Client {
  id: string;
  username: string;
  phone: string;
  email: string;
}
 
export default function ClienteDetalhes() {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null); 
  const [clientId, setClientId] = useState(router.query.id);

  useEffect(() => {
    if (clientId) {
      getOneClient();
    }
  }, [clientId]); 

  const getOneClient = async () => {
    try {
      const response = await api.get(`/cliente/${clientId}`);
      setClient(response.data[0]);
    } catch (error) {
      console.error('Error fetching client details:', error);
      setClient(null);
    }
  };

  return (
    <div className="container d-flex">
      <Menu />
      {client ? (
        <table className="mt-8 w-full bg-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-purple-900 text-yellow-400">
            <tr>
              <th className="p-3 w-1/4">Id</th>
              <th className="p-3 w-1/4">Username</th>
              <th className="p-3 w-1/4">telefone</th>
              <th className="p-3 w-1/4">email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">{client.id}</td>
              <td className="p-3">{client.username}</td>
              <td className="p-3">{client.phone}</td>
              <td className="p-3">{client.email}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
