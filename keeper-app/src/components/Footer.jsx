import React from 'react';

export function Footer(props) {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
        <p>
        Copyright © {currentYear}
        </p>
        </footer>
    )
}
export default Footer;