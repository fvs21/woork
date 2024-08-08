'use client';

import Navbar from "../../components/Navbar/Navbar";
import { useState } from 'react';
import { useFetchUser } from '../../hooks/authentication';
import Searchbar from "../../components/Searchbar/Searchbar";
import "../../assets/globals.scss";
import JobCategories from "../../features/JobCategories/JobCategories";
import JobsListing from "../../features/JobsListing/JobsListing";
import LocationSelector from "../../features/LocationSelector/LocationSelector";

export default function HomePage() {
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [category, setCategory] = useState(0);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const { isLoading } = useFetchUser();

    return (
        <main>
            <header>
                <Navbar showButtons={!isLoading} setPopUp={setPopUpVisible} popUpVisible={popUpVisible}/>
                <br/>
                <Searchbar />
                <br/>
                <div style={{width: "100%"}}>
                    <hr className="hr-line"/>
                </div>
            </header>
            <JobCategories category={category} setCategory={setCategory}/>
            <br/>
            <LocationSelector country={country} setCountry={setCountry} state={state} setState={setState} city={city} setCity={setCity} />
            <section>
                <JobsListing category={category} />
            </section>
        </main>
    )
}
