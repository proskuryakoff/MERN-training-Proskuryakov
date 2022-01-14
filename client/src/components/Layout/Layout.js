import Container from "../Container/Container";
import Navbar from "../Navigation/Navbar";
import './Layout.css'

const layout = (props) => (
    <div className="layout">
        <Navbar/>
        <main className="Content">
            <Container>
                {props.children}
            </Container>
        </main>
    </div>
)
 
export default layout;