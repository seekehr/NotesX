import './css/Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <ul className="nav-items">
                <div className="small-logo">        
                <li><img src={`${process.env.PUBLIC_URL}/codelogo.png`} href="#root" alt="A random logo depicting an HTML tag."></img></li>
                </div>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    );
}

export default Navbar;