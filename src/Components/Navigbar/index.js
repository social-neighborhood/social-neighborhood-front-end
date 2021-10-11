import React,{useState,useEffect} from 'react';
import {FaBars} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import {animateScroll as scroll } from 'react-scroll';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItems,
    NavLinks,
    NavBtnWrapper,
    Button
} from './NavigbarElements';

const Navbar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false);
    const changeNav =()=>{
        if(window.scrollY >= 80){
            setScrollNav(true)
        }
        else{
            setScrollNav(false)
        }
    }

    useEffect( () => {
            window.addEventListener('scroll',changeNav)
    },[]);

    const toggleHome =() =>{
        scroll.scrollToTop();
    }
    return (
        <>
        <IconContext.Provider value={{color: "#fff"}}>
        {/*create with rafce command'*/}
            <Nav scrollNav={scrollNav}>
                <NavbarContainer >
                    <NavLogo to='/' onClick={toggleHome}>Social Neighborhood</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItems>
                        </NavItems>
                        <NavItems>
                        </NavItems>
                        <NavItems>
                        </NavItems>
                        <NavBtnWrapper>
                            <Button >Log Out </Button>
                        </NavBtnWrapper>
                    </NavMenu>

                </NavbarContainer>
            </Nav>
            </IconContext.Provider> 
        </>
    )
}
export default Navbar
