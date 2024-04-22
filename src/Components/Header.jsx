import React from 'react'
import styled from 'styled-components'
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import MyFont from '../fonts/Fanda_Sans.TTF'
import { Link } from 'react-router-dom';

export const Header = () => {
  
  return (
    <HeaderContainer>
      <HeaderWrapper >
        <Link to='/'><h1><span>M</span>otonari</h1></Link>
        <ul>
          <li>
            <Link to='/admin/' >管理者</Link>
          </li>
          <li>
            <a href='https://twitter.com/motonadev' ><FaXTwitter /></a>
          </li>
          <li>
            <a href='https://github.com/MoGomez-dev' ><FaGithub /></a>
          </li>
        </ul>
      </HeaderWrapper>
    </HeaderContainer>
  )
}

const HeaderWrapper = styled.nav`
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration: none;
  }

  h1 {
    font-size: 40px;
    font-weight: normal;
    color: #808080;
    font-family: 'Fanda', sans-serif;

    span {
      color: #57b399
    }
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;

    li {
      padding-right: 15px;
      transition: all 0.2s; 
      margin-right: 10px;
      font-size: 20px;

      &:hover {
        color: #505050;
        transform: scale(1.2);
      }

      a {
        color: #808080;
        text-decoration: none;
      }
    }
  }
    @font-face {
      font-family: 'Fanda';
      src: url(${MyFont}) format('truetype');
    }
  `

const HeaderContainer = styled.header`
  height: 100px;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`