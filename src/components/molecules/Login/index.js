import React from "react";
import { useSelector, useDispatch } from "react-redux";

// component
import Buttons from "components/atoms/Buttons";
import Modal from "components/atoms/Modal";

// state global
import { authStore } from "store/authSlice";

function Login() {
    const { login } = useSelector((state) => state.authModal);

    const dispatch = useDispatch();

    const handleOpenRegister = () => {
        dispatch(
            authStore({
                login: false,
                register: true,
            })
        );
    };
    return (
        <>
            <Modal open={login}>
                <h6 className="font-tinos font-bold text-4xl mb-9">Login</h6>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 mb-5"
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 mb-9"
                />
                <Buttons className="mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500 z-10">
                    Login
                </Buttons>
                <p className="text-lg text-center mt-5">
                    Don't have an account ?{" "}
                    <span
                        className="font-bold cursor-pointer"
                        onClick={() => handleOpenRegister()}
                    >
                        Click Here
                    </span>
                </p>
            </Modal>
        </>
    );
}

export default Login;
