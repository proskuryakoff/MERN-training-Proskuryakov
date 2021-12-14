import Aux from "../../hoc/Auxil";
import Navbar from "../Navigation/Navbar";

const layout = (props) => (
    <Aux>
        {/* <Navbar/> */}
        <main>
            {props.children}
        </main>
    </Aux>
)
 
export default layout;