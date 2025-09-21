import React, { useState } from 'react'
import { Button } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { useAuthContext } from '../../contexts/Auth/AuthContext'
import { FaDonate } from 'react-icons/fa'

const Navbar = () => {
    const { isAuth, handleLogout } = useAuthContext()
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide flex items-center gap-2">
                    <FaDonate />
                    Donation-Hub
                </Link>

                {/* Desktop menu */}
                <ul className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="relative group cursor-pointer">
                        Home
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
                    </Link>

                    <li className="relative group cursor-pointer" onClick={() => navigate("/dashboard")}>
                        Dashboard
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
                    </li>

                    {/* Donate Button */}
                    {/* <Link to="/donate">
                        <Button className='!bg-yellow-400 !text-black !border-none !rounded-2xl flex items-center gap-1'>
                            <FaDonate /> Donate
                        </Button>
                    </Link> */}
                </ul>

                {/* Auth buttons */}
                <div className="hidden md:flex items-center space-x-2">
                    {!isAuth ? (
                        <Link to="/auth/login">
                            <Button className='!text-white !bg-green-600 !border-none !rounded-2xl'>
                                <LoginOutlined />
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            className='!text-white !bg-red-600 !border-none !rounded-2xl'
                            onClick={handleLogout}
                        >
                            <LogoutOutlined />
                        </Button>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden bg-transparent border-0 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="xl" />
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col px-4 pb-4 space-y-4 animate-slideDown">
                    <Link to="/" className="relative group cursor-pointer" >
                        Home
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
                    </Link>

                    <li className="relative group cursor-pointer" onClick={() => navigate("/dashboard")}>
                        Dashboard
                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full"></span>
                    </li>

                    {/* Donate Button */}
                    {/* <Link to="/donate" className="flex justify-start">
                        <Button className='!bg-yellow-400 !text-black !border-none !rounded-2xl flex items-center gap-1'>
                            <FaDonate /> Donate
                        </Button>
                    </Link> */}

                    {/* Auth buttons */}
                    {!isAuth ? (
                        <Link to="/auth/login">
                            <Button className='!text-white !bg-green-600 !border-none !rounded-2xl'>Login</Button>
                        </Link>
                    ) : (
                        <Button
                            className='!text-white !bg-red-600 !border-none !rounded-2xl'
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </ul>
            )}
        </nav>
    )
}

export default Navbar
