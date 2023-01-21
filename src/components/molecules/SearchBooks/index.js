import React, {memo} from "react";

import Books from "components/molecules/Books";
import LoadingAnimate from "components/atoms/LoadingAnimate";
import Buttons from "components/atoms/Buttons";

function SearchBooks({
    dataBooksSearch,
    isLoadingSearch,
    prosesListBooks,
    totalSearch,
    handlePageSearch,
}) {
    // console.log('isLoadingSearch', isLoadingSearch)
    // console.log('dataBooksSearch', dataBooksSearch.length)
    return (
        <>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-16 mt-10">
                {isLoadingSearch ? (
                    <LoadingAnimate />
                ) : dataBooksSearch?.length > 0 ? (
                    dataBooksSearch?.map((book, index) => (
                        <Books key={`search-${book.id}-${index}`} data={book} />
                    ))
                ) : (
                    <div>
                        <p className="text-red-900 text-xl font-bold block">
                            Data Not Found
                        </p>
                        <Buttons
                            className="mt-5 block border-2 border-[#393939] bg-[#393939] rounded py-2.5 w-4/12 text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white "
                            onClick={() => prosesListBooks()}
                        >
                            <p>Back</p>
                        </Buttons>
                    </div>
                )}
            </div>
            {dataBooksSearch.length < totalSearch && (
                <Buttons
                    onClick={() => {
                        handlePageSearch();
                    }}
                    isLoading={isLoadingSearch}
                    className={`mt-10 w-4/12 mx-auto block text-center flex-1 rounded text-white py-2 text-xl font-bold ${
                        isLoadingSearch
                            ? "bg-slate-400 pointer-events-none"
                            : "border-2 border-[#393939] bg-[#393939] hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white"
                    }`}
                >
                    {isLoadingSearch ? <LoadingAnimate /> : "Load More"}
                </Buttons>
            )}
        </>
    );
}

export default memo(SearchBooks);
