import Head from 'next/head';
import Menu from '../components/Menu';
import Tabela from '@/components/Table';
import { AiOutlineUserAdd } from 'react-icons/ai';

function Home({ data }: any) {
    return (
        <div className="container d-flex">
            <Head>
                <meta charSet="utf-8" />
                <meta name="robots" content="index, follow" />
                <meta name="description" content="API CRUD Clientes" />
                <meta name="author" content="Thiago - Nascimento" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <title>API - Home</title>
            </Head>
            <Menu showCreateUser={true} /> 
            <Tabela />
        </div>
    )
}

export default Home;