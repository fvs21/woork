import styles from "./JobsListing.module.scss";
import JobPosting from "../../components/JobPosting/JobPosting";
import { useEffect } from "react";

export default function JobListing({category}) {
    useEffect(() => {
        console.log(category);
    }, [category]);

    return (
        <div className={styles['jobs-listing-container']}>
            <JobPosting href={"/posting/1"} imgSrc={"https://media.admagazine.com/photos/618a675951ab72df0a76433a/1:1/w_2001,h_2001,c_limit/68307.jpg"} 
                title={"Mantenimiento jardín"} description={"Podar y regar jardín"} price={"100"} author={"Mario Cabañas"}/>
            <JobPosting href={"/"} imgSrc={"https://media.admagazine.com/photos/618a675951ab72df0a76433a/1:1/w_2001,h_2001,c_limit/68307.jpg"} 
                title={"Mantenimiento jardín"} description={"Podar y regar jardín"} price={"100"} author={"Mario Cabañas"}/>
            <JobPosting href={"/"} imgSrc={"https://media.admagazine.com/photos/618a675951ab72df0a76433a/1:1/w_2001,h_2001,c_limit/68307.jpg"} 
                title={"Mantenimiento jardín"} description={"Podar y regar jardín"} price={"100"} author={"Mario Cabañas"}/> 
            <JobPosting href={"/"} imgSrc={"https://media.admagazine.com/photos/618a675951ab72df0a76433a/1:1/w_2001,h_2001,c_limit/68307.jpg"} 
                title={"Mantenimiento jardín"} description={"Podar y regar jardín"} price={"100"} author={"Mario Cabañas"}/>
            <JobPosting href={"/"} imgSrc={"https://media.admagazine.com/photos/618a675951ab72df0a76433a/1:1/w_2001,h_2001,c_limit/68307.jpg"} 
                title={"Mantenimiento jardín"} description={"Podar y regar jardín"} price={"100"} author={"Mario Cabañas"}/>
            <JobPosting href={"/"} imgSrc={"https://media.admagazine.com/photos/618a675951ab72df0a76433a/1:1/w_2001,h_2001,c_limit/68307.jpg"} 
                title={"Mantenimiento jardín"} description={"Podar y regar jardín"} price={"100"} author={"Mario Cabañas"}/>
            <JobPosting href={"/"} imgSrc={"https://media.admagazine.com/photos/618a675951ab72df0a76433a/1:1/w_2001,h_2001,c_limit/68307.jpg"} 
                title={"Mantenimiento jardín"} description={"Podar y regar jardín"} price={"100"} author={"Mario Cabañas"}/>
            <JobPosting href={"/"} imgSrc={"https://media.admagazine.com/photos/618a675951ab72df0a76433a/1:1/w_2001,h_2001,c_limit/68307.jpg"} 
                title={"Mantenimiento jardín"} description={"Podar y regar jardín"} price={"100"} author={"Mario Cabañas"}/>
        </div>
    )
}