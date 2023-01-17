import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

// component
import Buttons from "components/atoms/Buttons";

// state global
import { authStore } from "store/authSlice";

// styling
import "./index.css";

// utils
import { rupiah } from "../../../utils/FormatCurrency";

const CardBook = memo(({ children, data, download }) => {
    // console.log('data', data)
    const { statusAuth } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    const handleOpenLogin = () => {
        dispatch(
            authStore({
                login: true,
                register: false,
            })
        );
    };

    const conditonLogin = () => {
        if (!statusAuth) {
            handleOpenLogin();
        }
    };

    if (download) {
        return <div>{children}</div>;
    }

    return (
        <Buttons
            href={`${statusAuth ? "books/" + data.slug : ""}`}
            onClick={() => conditonLogin()}
            type="link"
        >
            {children}
        </Buttons>
    );
});

function Books({ data, download }) {
    return (
        <CardBook data={data} download={download}>
            <div className="bg-white rounded-md p-3">
                <div className="h-[270px] w-full bg-white mb-3">
                    <img
                        src={data.thumbnail}
                        alt="cover-book"
                        className="w-full h-full object-contain object-center"
                    />
                </div>
                <h6 className="text-2xl font-bold font-tinos truncate-2 min-h-[60px]">
                    {data.title}
                </h6>
                <p className="italic text-sm text-[#929292] mb-3">
                    {data.author}
                </p>
                {download ? (
                    <Buttons
                        type="link"
                        href="https://assets.projectsdeddy.web.id/waysbooks/waysbook.pdf"
                        isExternal
                        target="_blank"
                        className="block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full min-w-[100px] text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white z-10"
                    >
                        Download
                    </Buttons>
                ) : (
                    <p className="text-[#44B300] font-bold text-lg">
                        {rupiah(data.price)}
                    </p>
                )}
            </div>
        </CardBook>
    );
}

export default memo(Books);
