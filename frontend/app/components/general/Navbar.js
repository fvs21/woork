import './Navbar.scss'

export default function Navbar(props) {
    if(props.showButtons) {
        return (
            <header className='main-nav-bar'>
                <div className='logo'>
                    <h2 className='color-white'><a>Woork</a></h2>
                </div>
                <nav>
                    <ul className='nav-links'>
                        <li>About</li>
                        <li>Test</li>
                    </ul>
                </nav>
                <button className='profile-btn'>Profile</button>
            </header>
        )
    } else {
        return (
            <header className='main-nav-bar'>
                <div className='logo'>
                    <h2 className='color-white'>Woork</h2>
                </div>
            </header>
        ) 
    }
    
}