import Navbar from "../Navigation/Navbar";
import './Layout.css'

const layout = (props) => (
    <div className="layout">
        <Navbar/>
        <main className="Content">
            {props.children}
        </main>
    </div>
)
 
export default layout;