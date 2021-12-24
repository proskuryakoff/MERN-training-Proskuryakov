import Aux from "../../hoc/Auxil";
import Navbar from "../Navigation/Navbar";
import './Layout.css'

const layout = (props) => (
    <Aux>
        <Navbar isAuthenticated = {props.isAuthenticated} />
        <main className="Content">
            {props.children}
        </main>
    </Aux>
)
 
export default layout;