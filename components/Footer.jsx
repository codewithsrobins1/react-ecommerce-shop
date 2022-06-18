import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Audiophile Store All Rights Reservered</p>
      <p className="icons">
        <a href="https://www.instagram.com" rel={"noreferrer"} target="_blank">
          <AiFillInstagram />
        </a>
        <a href="https://www.twitter.com" rel={"noreferrer"} target="_blank">
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  )
}

export default Footer