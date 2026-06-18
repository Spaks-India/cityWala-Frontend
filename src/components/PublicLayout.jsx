import React from "react";
import Footer from "./Footer";
import AppHeaders from "./Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return(
        <>
            <AppHeaders />
              <Outlet />
            <Footer />
        </>
    )
}

export default PublicLayout;