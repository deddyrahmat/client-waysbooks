import PaymentPending from "components/molecules/PaymantPending";
import PaymentCancel from "components/molecules/PaymentCancel";
import React, { useState, useEffect } from "react";

function ListOrder() {
    

    return (
        <>
            
            <div className="mt-20">
                <div className="container mx-auto px-10 pb-14">
                    <PaymentPending />
                    <PaymentCancel />
                </div>
            </div>
        </>
    );
}

export default ListOrder;
