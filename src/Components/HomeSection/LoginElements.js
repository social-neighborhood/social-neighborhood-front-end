import styled from  'styled-components';
import { Link as LinkR } from 'react-router-dom';
import {MdKeyboardArrowRight,MdArrowForward} from 'react-icons/md';
export const HeroContainer = styled.div`
    background: linear-gradient(45deg, #5757D9 0%, #21D9F7 100%);;
    display: flex;
    justify-content: center;
    position: relative;
    z-index:1;
    :before{
        content: '';
        position:absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index:2;
    }
`;

export const HeroBg =styled.img`
    position:absolute;
    right : 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;  
`;

export const HeroContent =styled.div`
    z-index:3;
    padding-top: 190px;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HeroContentWrapper = styled.div`
    background: linear-gradient(
        180deg, 
        rgba(0,0,0,0.2) 0%,
        rgba(0,0,0,0.6)  100%
    ),
    linear-gradient(
        180deg,
        rgba(0,0,0,0.2) 0%,
        transparent 100%
    );
    z-index:1;
    height: 450px;
    width: 100%;
    padding: 5px;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    justify-content: center;
    border-radius: 30px;
`;

export const HeroRow = styled.div`
    display:grid;
    grid-auto-columns: minmax(auto,1fr);
    align-items: center;
    grid-template-areas: 'col1 col2';
    @media screen and (max-width: 768px){
        grid-template-areas:  'col1 col1' 'col2 col2';
    
        }
`;
export const HColumn1 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col1;
`;

export const HColumn2 = styled.div`
    grid-area:col2;
`;
export const HeroH1 = styled.h1`
    color: #fff;
    font-size: 60px;
    text-align: left;
    @media screen  and (max-width:750px){
        font-size:40px;
    }
    @media screen  and (max-width:500px){
        font-size:35px;
    }
`;

export const HeroP = styled.p`
    color: #fff;
    font-size: 18px;
    text-align: left;
    max-width: 600px;
    @media screen  and (max-width:750px){
        font-size:24px;
    }
    @media screen  and (max-width:500px){
        font-size:18px;
    }
`;

export const HeroBtnWrapper =styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


export const ArrowForward =styled(MdArrowForward)`
    margin-left: 8px;
    font-size: 20px;
`;

export const ArrowRight=styled(MdKeyboardArrowRight)`
    margin-left: 8px;
    font-size: 20px;
`;
export const Button =styled(LinkR)`
    border-radius: 50px;
    background: Teal;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-weight:bold;
    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010906;
    }
`;

export const SocialHeroWrapper =styled.div`
    margin: 0 auto;
    max-width: 240px;
    margin-top: 22px;
`;