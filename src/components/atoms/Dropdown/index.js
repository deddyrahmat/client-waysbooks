import React from "react";
import { FaUserAlt, FaSignOutAlt, FaBookMedical } from "react-icons/fa";

import {  useSelector } from "react-redux";

// component
import Buttons from "../Buttons";

function Dropdown({funDropdown}) {
    const { statusAuth, role } = useSelector((state) => state.authReducer);
    // console.log('funDropdown', funDropdown)
    return (
        <div className={`${funDropdown ? 'block' : 'hidden'} absolute right-0 w-40 mt-2 bg-white border rounded shadow-xl`}>
            {role === 'administrator' ? (
                <Buttons href="/admin/add-book" type="link" className="transition-colors duration-200 block px-5 py-4 text-normal text-gray-900 rounded hover:bg-slate-300 hover:text-black">
                <div className="flex space-x-2 items-center">
                    <FaUserAlt size={20} />
                    <p className="font-bold text-lg">
                    Profile
                    </p>
                </div>
            </Buttons>
            ) : (<Buttons href="/profile" type="link" className="transition-colors duration-200 block px-5 py-4 text-normal text-gray-900 rounded hover:bg-slate-300 hover:text-black">
                <div className="flex space-x-2 items-center">
                    <FaUserAlt size={20} />
                    <p className="font-bold text-lg">
                    Profile
                    </p>
                </div>
            </Buttons>)}
            
            <hr />
            <Buttons href="#" type="link" className="transition-colors duration-200 block px-5 py-4 text-normal text-gray-900 rounded hover:bg-slate-200 hover:text-black">
                <div className="flex space-x-2 items-center">
                    <FaSignOutAlt color="red" size={20} />
                    <p className="font-bold text-lg">
                    Logout
                    </p>
                </div>
            </Buttons>
        </div>
    );
}

export default Dropdown;
