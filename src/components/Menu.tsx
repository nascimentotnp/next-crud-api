import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { CgUserlane } from "react-icons/cg";

const Menu = ({ showCreateUser }:any
    ) => {
    return (
        <div className="max-width">
            <nav className="navbar">
                <div className="max-width">
                    <div className="logo">
                        <a href="/">TAHA</a>
                    </div>
                    <ul className="menu">
                        <li><a href="/" className="menu-btn" title="Home"><AiOutlineHome /></a></li>
                        {showCreateUser ? (
                            <li>
                                <Link href="/criarUsuario" title="Adicionar Cliente">
                                    <AiOutlineUserAdd />
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Menu;
