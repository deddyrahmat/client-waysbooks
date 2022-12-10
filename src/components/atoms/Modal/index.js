import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { authStore } from "store/authSlice";

function Modal(props) {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(
            authStore({
                login: false,
                register: false,
            })
        );
        if (props.handleProps) {
            props.handleProps();
        }
    };
    return (
        <>
            <div
                className={`${
                    props.open ? "flex" : "hidden"
                } w-full bg-slate-800 bg-opacity-50 justify-center items-center flex-col fixed top-0 right-0 bottom-0 left-0 z-50 overflow-hidden h-screen`}
            >
                <div className="relative w-full sm:w-2/4 lg:w-1/4 px-3">
                    <MdClose
                        className="mb-4 absolute top-[-30px] right-[10px] cursor-pointer bg-white rounded-full"
                        size={25}
                        onClick={() => {
                            handleClose();
                        }}
                    />
                    <div className="bg-white px-8 py-10 rounded-md ">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
