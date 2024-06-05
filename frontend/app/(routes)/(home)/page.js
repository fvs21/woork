'use client';

import Navbar from '../../components/navbar/NavBar';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function HomePage() {
    const [popUpVisible, setPopUpVisible] = useState(false);

    return (
        <main>
            <Navbar showButtons={true} setPopUp={setPopUpVisible} popUpVisible={popUpVisible}/>
        </main>
    )
}