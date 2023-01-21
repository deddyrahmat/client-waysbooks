import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MdSearch } from "react-icons/md";

// config
import ApiBooks from "config/Endpoint/book";

// componet
import Books from "components/molecules/Books";
import LoadingAnimate from "components/atoms/LoadingAnimate";
import Buttons from "components/atoms/Buttons";
import Input from "components/atoms/Form/Input";

// utils
import MessageValidation from "utils/MessageValidation";
import SearchBooks from "components/molecules/SearchBooks";
import PageAllBooks from "components/molecules/PageAllBooks";

function AllBooks() {
    const [dataBooks, setDataBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSearch, setPageSearch] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalSearch, setTotalSearch] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [dataBooksSearch, setDataBooksSearch] = useState([]);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [statusSearch, setStatusSearch] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [newSearch, setNewSearch] = useState(false);

    // function handle page for loadmore book
    const handlePage = useCallback(() => {
        setPage(page + 1);
    }, [page]);

    // function handle page for loadmore book result search
    const handlePageSearch = useCallback(() => {
        setPageSearch(pageSearch + 1);
    }, [pageSearch]);

    // get all bokk
    const prosesListBooks = async () => {
        setIsLoading(true);
        try {
            
            // jika status search aktif(true) maka kosong kan databooks sebelumnya, jadi nanti yang muncul databooks default di awal
            if (statusSearch) {
                setDataBooks([]);
                setStatusSearch(false)
            }

            const response = await ApiBooks.list(page, 10);
            
            if (response.status === 1) {
                setDataBooks([...dataBooks, ...response.data]);
                setTotal(response.total_data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // jika ada update di state dibawah
        // cek statusSearch, jika true maka jalankan proses mencari book berdasarkan title
        // jika false, jalankan books default
        if (statusSearch) {
            prosesSearch();
        } else {
            prosesListBooks();
        }
    }, [statusSearch, page, pageSearch, keyword]);

    // validation form
    const formValidation = Yup.object().shape({
        keyword: Yup.string().required(MessageValidation.required),
    });

    const initForm = {
        keyword: "",
    };

    const prosesSearch = async () => {
        setIsLoadingSearch(true);
        try {
            // jika keyword ada value dan bukan string kosong
            // jalankan function search berdasarkan keyword
            if (keyword !== '') {
                const response = await ApiBooks.search(pageSearch, 2, keyword);
            
                if (response.status === 1) {
                    // jika state newSearch true, maka simpan data book hasil pencarian ke state kosong atau hasil pencarian baru
                    // tapi jika false maka ini untuk fitur load more, dia akan menyimpan data baru tanpa menghapus data lama
                    if (newSearch) {
                        setDataBooksSearch(response.data)
                        // setPageSearch(1)
                    }else{
                        setDataBooksSearch([...dataBooksSearch, ...response.data]);
                    }
                    setTotalSearch(response.total_data);
                    setIsLoadingSearch(false);
                    setNewSearch(false)
                }
            }
            // lalu ubah nilai page menjadi 1 agar nanti jika di load more book sebelumnya lebih dari satu akan di set default lagi jadi 1
            setPage(1);
        } catch (error) {
            console.log("Your System ", error);
            setIsLoadingSearch(false);
        }
    };
    
    const handleSubmit = (values) => {
        setPageSearch(1)
        setKeyword("");
        setStatusSearch(true);
        setKeyword(values.keyword);
        setNewSearch(true);
        prosesSearch();
    };

    return (
        <div className="mt-10">
            <div className="container mx-auto pb-14">
                <Formik
                    initialValues={initForm}
                    validationSchema={formValidation}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <div className="flex w-full lg:w-5/12 items-start justify-center space-x-3 ">
                                    <div className="inline w-full">
                                        <Input
                                            type="text"
                                            name="keyword"
                                            placeholder="Search Title Book"
                                            propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC] w-full rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 "
                                        />
                                    </div>
                                    <Buttons
                                        type="button"
                                        typeButton="submit"
                                        isLoading={isLoading}
                                        className=" border-2 border-[#393939] bg-[#393939] rounded py-2.5 w-4/12 text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white "
                                    >
                                        {isLoading ? (
                                            <LoadingAnimate />
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <MdSearch size={22} />
                                                <p>Search</p>
                                            </div>
                                        )}
                                    </Buttons>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
                
                    {/* for data search */}
                    {statusSearch ? (
                        <SearchBooks dataBooksSearch={dataBooksSearch} isLoadingSearch={isLoadingSearch} totalSearch={totalSearch} handlePageSearch={handlePageSearch} prosesListBooks={prosesListBooks} />
                    ) : <PageAllBooks dataBooks={dataBooks} isLoading={isLoading} total={total} handlePage={handlePage} />}
                
            </div>
        </div>
    );
}

export default AllBooks;
