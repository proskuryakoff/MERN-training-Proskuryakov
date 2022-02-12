import React from "react";
import Container from "../Container/Container";
import Navbar from "../Navigation/Navbar";
import './Layout.css'

const layout = (props) => {
    return (
        <div className="layout">
        <Navbar/>
        <main className="Content">
            <Container>
                {props.children}
            </Container>
        </main>
    </div>
    )
} 
 
export default layout;