import React, {memo} from "react";

import Books from "components/molecules/Books";
import LoadingAnimate from "components/atoms/LoadingAnimate";
import Buttons from "components/atoms/Buttons";

function PageAllBooks({ dataBooks, isLoading, total, handlePage }) {
    return (
        <>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-16 mt-10">
                {dataBooks?.length > 0 ? (
                    dataBooks?.map((book, index) => (
                        <Books key={`list-book-${book.id}-${index}`} data={book} />
                    ))
                ) : (
                    <div>
                        <p className="text-red-900 text-xl font-bold block">
                            Data Not Found
                        </p>
                    </div>
                )}
            </div>
            {
                isLoading && (
                    <LoadingAnimate />
                )
            }
            {dataBooks.length < total && (
                <Buttons
                    onClick={() => {
                        handlePage();
                    }}
                    isLoading={isLoading}
                    className={`mt-10 w-4/12 mx-auto block text-center flex-1 rounded text-white py-2 text-xl font-bold ${
                        isLoading
                            ? "bg-slate-400 pointer-events-none"
                            : "border-2 border-[#393939] bg-[#393939] hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white"
                    }`}
                >
                    {isLoading ? <LoadingAnimate /> : "Load More"}
                </Buttons>
            )}
        </>
    );
}

export default memo(PageAllBooks);
