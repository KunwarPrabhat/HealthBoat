import React from 'react';
import { MdContactMail, MdLocalHospital } from 'react-icons/md';  // Hospital icon for HealthBoat
import './elements.css';

export function Header() {
  return (
    <header className="header">
      <h1>
        <MdLocalHospital style={{ verticalAlign: 'top', marginRight: '5px', fontSize: '40px' }} />
        HealthBoat
      </h1><h3>Your Trusted Guide to Better Health.</h3>
      <nav>
        <a href="/HealthBoat/contact.html">
          <MdContactMail style={{ verticalAlign: 'top', marginRight: '6px', fontSize: '28px' }} />
          Contact
        </a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 HealthBoat.</p>
    </footer>
  );
}
