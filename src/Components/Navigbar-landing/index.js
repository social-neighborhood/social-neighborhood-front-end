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
                            <NavLinks 
                                to="about"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact ='true' 
                                offset={20}
                            >Quienes Somos?</NavLinks>
                        </NavItems>
                        <NavItems>
                            <NavLinks 
                                to="ls"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact ='true' 
                                offset={20}
                                >Contáctanos</NavLinks>
                        </NavItems>
                        <NavBtnWrapper>
                            <Button  to='/Login'>Iniciar sesion </Button>
                        </NavBtnWrapper>
                    </NavMenu>

                </NavbarContainer>
            </Nav>
            </IconContext.Provider> 
        </>
    )
}
export default Navbar
