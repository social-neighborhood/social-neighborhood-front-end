import React from 'react'

import {    
    FooterContainer,
    FooterWrap,
    SocialMedia,
    SocialMediaWrap,
    WebSiteRight,
    SocialLogo

} from './FooterElements';
const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/'>Social Neighborhood</SocialLogo>
                        <WebSiteRight>Ana Maria Salazar Bohorquez,
                             Juan Camilo Posso Guevara, Richard Santiago Urrea Garcia © {new Date().getFullYear()} All rights  reserved</WebSiteRight>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer