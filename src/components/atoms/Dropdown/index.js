import React from "react";

function Dropdown() {
    return (
        <div className="flex justify-center p-12">
            {/* <!-- Dropdown --> */}
            <div className="relative">
                <button className="block h-12 w-12 rounded-full overflow-hidden focus:outline-none">
                    <img
                        className="h-full w-full object-cover"
                        src="https://eu.ui-avatars.com/api/?name=John&size=1000"
                        alt="avatar"
                    />
                </button>
                {/* <!-- Dropdown Body --> */}
                <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
                    <a
                        href="#"
                        className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                    >
                        Settings
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
                {/* <!-- // Dropdown Body --> */}
            </div>
            {/* <!-- // Dropdown --> */}
        </div>
    );
}

export default Dropdown;
