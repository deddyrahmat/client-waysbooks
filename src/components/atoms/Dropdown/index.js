import React from "react";

function Dropdown({funDropdown}) {
    // console.log('funDropdown', funDropdown)
    return (
        <div className={`${funDropdown ? 'block' : 'hidden'} absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl`}>
            <a
                href="#"
                className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
                Profile
            </a>
            <div className="py-2">
                <hr></hr>
            </div>
            <a
                href="#"
                className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
                Logout
            </a>
        </div>
    );
}

export default Dropdown;
