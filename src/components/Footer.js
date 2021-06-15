import React, { useState } from 'react'

const Footer = () => {
    const [year] = useState(new Date().getFullYear());

    return (
        <footer className="footer">
            &copy; {year}. All Right Reserved. Railways
        </footer>
    )
}

export default Footer
