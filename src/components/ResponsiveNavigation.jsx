import React, {useState} from 'react'
import { Link } from '@reach/router'

function ResponsiveNavigation ({navLinks, background,
                                hoverBackground, linkColor, logo, siblogo}) {

    const [ hoverIndex, setHoverIndex ] = useState(-1)
    const [ navOpen, setNavOpen ] = useState(false)

    return (
        <nav 
            className="responsive-toolbar"
            style={{ background }}
            >
                <div className="siblogo-mobile">
                    <Link to="/">
                        <img src={siblogo} height="40px" width="40px" alt="logo-nav-toggler"/>
                    </Link>
                </div>
            <ul 
                style={{ background }}
                className={navOpen ? 'active' : '' }>

                <div className="siblogo-web">
                    <Link to="/">
                        <img src={siblogo} height="40px" width="40px" alt="logo-nav-toggler"/>
                    </Link>
                </div>

                <figure onClick={()=> setNavOpen(!navOpen) }>
                    <img src={logo} height="40px" width="40px" alt="logo-nav-toggler"/>
                </figure>
                {navLinks.map((link,i) =>
                    <li 
                        key={i} 
                        onMouseEnter={ ()=> setHoverIndex(i) }
                        onMouseLeave={ ()=> setHoverIndex(-1) }
                        style = {{background: hoverIndex === i ? (hoverBackground || '#999') : ''}}
                    >
                        <Link 
                            to={link.path}
                            style={{color:linkColor}}
                        >
                        {link.text}
                        <i className={link.icon} />
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default ResponsiveNavigation