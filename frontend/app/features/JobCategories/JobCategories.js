import styles from "./JobCategories.module.scss";
import JobCategoryButton from "../../components/JobCategoryButton/JobCategoryButton";
import Plant from "../../components/SVGs/JobCategories/Plant";
import Plumbery from "../../components/SVGs/JobCategories/Plumbery";
import House from "../../components/SVGs/JobCategories/House";
import Electrical from "../../components/SVGs/JobCategories/Electrical";
import Pet from "../../components/SVGs/JobCategories/Pet";
import Vehicle from "../../components/SVGs/JobCategories/Vehicle";

export default function JobCategories({category, setCategory}) {
    return (
        <div className={styles['categories-container']}>
            <div className={styles['categories-list']}>
                <JobCategoryButton selected={category == 0} name={"Jardinería"} click={() => setCategory(0)} icon={<Plant width={"20px"}/>}/>
                <JobCategoryButton selected={category == 1} name={"Plomería"} click={() => setCategory(1)} icon={<Plumbery width={"20px"}/>} />
                <JobCategoryButton selected={category == 2} name={"Hogar"} click={() => setCategory(2)} icon={<House width={"20px"}/>}/>
                <JobCategoryButton selected={category == 3} name={"Electricidad"} click={() => setCategory(3)} icon={<Electrical width={"20px"}/>}/>
                <JobCategoryButton selected={category == 4} name={"Mascotas"} click={() => setCategory(4)} icon={<Pet width={"20px"} />} />
                <JobCategoryButton selected={category == 5} name={"Vehículos"} click={() => setCategory(5)} icon={<Vehicle width={"20px"} />} />
            </div>
        </div>
    )
}