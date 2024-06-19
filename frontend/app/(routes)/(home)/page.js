'use client';

import Navbar from '../../components/Navbar/Navbar';
import { useState } from 'react';
import { useFetchUser } from '../../hooks/authentication';

export default function HomePage() {
    const [popUpVisible, setPopUpVisible] = useState(false);
    
    const { _, isLoading } = useFetchUser();


    return (
        <main>
            <Navbar showButtons={!isLoading} setPopUp={setPopUpVisible} popUpVisible={popUpVisible}/>
        </main>
    )
}