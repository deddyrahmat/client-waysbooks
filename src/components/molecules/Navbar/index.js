import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";

// state global
import { authStore } from "store/authSlice";

// component
import Buttons from "components/atoms/Buttons";
import Login from "components/molecules/Login";
import Register from "components/molecules/Register";

function Navbar() {
    const [nav, setNav] = useState(false);

    const toggleNav = () => {
        setNav(!nav);
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
                <Buttons type="link" href="" className="w-full z-10">
                    <img
                        src="assets/logo/logo.jpg"
                        alt="logo"
                        className="w-max-[111px]"
                    />
                </Buttons>

                <div className="hidden lg:flex justify-center items-center space-x-4">
                    <Buttons
                        className="border-2 border-[#393939] rounded-sm py-1.5 w-full min-w-[100px] text-center hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500 z-10"
                        onClick={() => handleOpenLogin()}
                    >
                        Login
                    </Buttons>

                    <Buttons
                        className="border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full min-w-[100px] text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500 z-10"
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
            </div>
            <div
                className={`${
                    nav ? "top-0" : "top-[-100%]"
                } fixed lg:hidden mx-auto w-full transition-all duration-700 ease-in-out bg-gray-100 py-4 z-10`}
            >
                <div className="xs:container mx-auto">
                    <div className="flex z-10 justify-end lg:hidden mb-3">
                        <MdClose size={40} onClick={toggleNav} />
                    </div>

                    <Buttons
                        className="block border-2 border-[#393939] w-full text-center rounded-sm py-1.5 hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500 z-10"
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
            </div>
        </nav>
    );
}

export default Navbar;
