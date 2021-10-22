import React from 'react';
import {
    HeroContainer,
    HeroBg,
    HeroContent,
    HeroP,
    HeroH1,
    HeroContentWrapper
} from './LoginElements';
import './LoginFormElements.css';
import people from './../../img/background.jpg';
const HomeSection = () => {
    return (
        <HeroContainer id="home">
            <HeroBg src={people} alt="none">
            </HeroBg>
            <HeroContent>
                <HeroContentWrapper>
                    <HeroH1>Social Neighborhood</HeroH1>
                    <HeroP> 
                        Una red social hecha a tu media, comparte y disfruta con tus amigos!
                    </HeroP>
                </HeroContentWrapper>
            </HeroContent>
        </HeroContainer>
    )
}
export default HomeSection;