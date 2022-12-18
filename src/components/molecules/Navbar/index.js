import React, { useState } from "react";
import { MdMenu, MdClose, MdShoppingCart, MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

// state global
import { authStore } from "store/authSlice";

// component
import Buttons from "components/atoms/Buttons";
import Login from "components/molecules/Login";
import Register from "components/molecules/Register";
import Dropdown from "components/atoms/Dropdown";

function Navbar() {
    const { statusAuth, role } = useSelector((state) => state.authReducer);
    const {cart} = useSelector((state) => state.cartReducer);

    // state show menu in mobile version
    const [nav, setNav] = useState(false);
    
    const toggleNav = () => {
        setNav(!nav);
    };

    // ==========================
    // state show dropdown user login
    const [funDropdown, setFunDropdown] = useState(false);
    
    const toggleDropdown = () => {
        setFunDropdown(!funDropdown);
    };

    const dispatch = useDispatch();

    const handleOpenLogin = () => {
        dispatch(
            authStore({
                login: true,
                register: false,
            })
        );
    };

    const handleOpenRegister = () => {
        dispatch(
            authStore({
                login: false,
                register: true,
            })
        );
    };

    return (
        <nav>
            <Login />
            <Register />
            <div className="xs:container xxl:container mx-auto flex justify-between items-center pt-4 lg:pt-10 px-6">
                <div className="w-full">
                    <Buttons type="link" href="/" className="block z-10 w-[111px]">
                        <img
                            src="/assets/logo/logo.png"
                            alt="logo"
                            className="w-max-[111px]"
                        />
                    </Buttons>
                </div>

                {/* versi desktop */}
                {
                    statusAuth ? (
                        <>
                            {
                                role === 'administrator' ? (
                                    <>
                                    {/* desktop */}
                                        <div className="border-r-2 border-gray-400 hidden md:flex items-center mr-10 ">
                                            <Buttons className="relative mr-10 z-10 " href="/admin/book" type="link">
                                                <p className="text-lg font-bold hover:underline hover:underline-offset-8">Book</p>
                                            </Buttons>
                                            <Buttons className="relative mr-10 z-10 " href="/admin/transaction" type="link">
                                                <p className="text-lg font-bold hover:underline hover:underline-offset-8">Transaction</p>
                                            </Buttons>
                                        </div>
                                        {/* mobile */}
                                        <MdMoreVert size={36} className="md:hidden mr-4 cursor-pointer" onClick={() => toggleNav()} />
                                    </>
                                ) : (
                                    <Buttons className="relative mr-5 z-10 " href="/cart" type="link">
                                        <MdShoppingCart size={36} className="cursor-pointer" />
                                        {
                                            cart.length > 0 && (
                                                <div className="absolute top-[-10px] right-[-3px] h-5 w-5 flex justify-center items-center text-xs text-white bg-[#F13F3F] rounded-full">
                                                    {cart.length}
                                                </div>
                                            )
                                        }
                                    </Buttons>
                                )
                            }
                            <div className="relative z-10">
                                <div className="h-11 w-11 overflow-hidden">
                                    <img className="inline-block h-full w-full object-cover rounded-full ring-2 ring-white cursor-pointer focus:outline-none" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="user" onClick={() => toggleDropdown()} />
                                </div>
                                <Dropdown funDropdown={funDropdown} />
                            </div>
                        </>
                    ) : (
                        <>
                        <div className="hidden lg:flex justify-center items-center space-x-4">
                            <Buttons
                                className="border-2 border-[#393939] rounded-sm py-1.5 w-full min-w-[100px] text-center hover:text-white hover:bg-[#393939] active:bg-[#393939] focus:outline-none focus:ring-1 focus:ring-[#393939] z-10"
                                onClick={() => handleOpenLogin()}
                            >
                                Login
                            </Buttons>

                            <Buttons
                                className="border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full min-w-[100px] text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white z-10"
                                onClick={() => handleOpenRegister()}
                            >
                                Register
                            </Buttons>
                        </div>

                        <MdMenu
                            className="flex lg:hidden z-10"
                            size={40}
                            onClick={toggleNav}
                        />
                        </>
                    )
                }

                
            </div>

            {/* versi mobile */}
            <div
                className={`${
                    nav ? "top-0" : "top-[-100%]"
                } fixed lg:hidden mx-auto w-full transition-all duration-700 ease-in-out bg-gray-100 py-4 z-10`}
            >
                {
                    statusAuth ? (
                        <div className="xs:container mx-auto">
                            <div className="flex z-10 justify-end lg:hidden mb-3">
                                <MdClose size={40} onClick={toggleNav} />
                            </div>

                            <Buttons
                                className="text-lg font-bold z-10"
                                type="link"
                                href='/admin/book'
                            >
                                Book
                            </Buttons>
                            <Buttons
                                className="text-lg font-bold z-10 my-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1 px-2 w-full text-white text-left"
                                type="link"
                                href='/admin/transaction'
                            >
                                Transaction
                            </Buttons>
                        </div>
                    ) : (
                        <div className="xs:container mx-auto">
                            <div className="flex z-10 justify-end lg:hidden mb-3">
                                <MdClose size={40} onClick={toggleNav} />
                            </div>

                            <Buttons
                                className="block border-2 border-[#393939] w-full text-center rounded-sm py-1.5 hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 z-10"
                                onClick={() => handleOpenLogin()}
                            >
                                Login
                            </Buttons>
                            <Buttons
                                className="mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500 z-10"
                                onClick={() => handleOpenRegister()}
                            >
                                Register
                            </Buttons>
                        </div>
                    )
                }
                
            </div>
        </nav>
    );
}

export default Navbar;
