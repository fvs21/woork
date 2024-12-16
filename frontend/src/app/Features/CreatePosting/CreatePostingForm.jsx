import styles from "./CreatePosting.module.scss";
import TextArea from "@/Components/TextArea/TextArea";
import CategorySelector from "@/Components/CategorySelector/CategorySelector";
import CurrencyInput from "@/Components/CurrencyInput/CurrencyInput";
import LocationSelector from "./LocationSelector";
import { lazy, Suspense, useState } from "react";
import ImagesInput from "./ImagesInput";
import { router } from "@inertiajs/react";
import LoadingScreen from "@/Components/LoadingScreen/LoadingScreen";
import CloseSVG from "@/Components/SVGs/Close";
import ArrowButton from "@/Components/ArrowButton/ArrowButton";
import TextInput from "@/Components/TextInput/TextInput";
import { useTheme } from "@/Hooks/theme";

const SelectLocationModal = lazy(() => import("./SelectLocationModal"));

export default function CreatePostingForm() {
    const [theme] = useTheme();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState();
    const [equipmentRequired, setEquipmentRequired] = useState(false);

    const [images, setImages] = useState([null, null, null]);

    const [selectLocationModal, setSelectLocationModal] = useState(false);

    const body = {
        title: title,
        description: description,
        category: category,
        price: price,
        location: location,
    }

    //images preview variables
    const [imagePreviewed, setImagePreviewed] = useState(0);
    const [imagesToPreview, setImagesToPreview] = useState([]);


    function changeImagePreviewed(value) {
        const maxElems = imagesToPreview.filter(Boolean).length-1;

        if(value < 0)
            setImagePreviewed(maxElems);
        else if(value > maxElems)
            setImagePreviewed(0);
        else
            setImagePreviewed(value);

    }


    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("body", JSON.stringify(body));

        let count = 1;
        for(let i = 0; i<images.length; i++) {
            const img = images[i];
            if(img != null) {
                formData.append("img" + count, images[i]);
                count++;
            }
        }
        router.post("/posting", formData);
    }

    return (
        <div className={styles['main-container']}>
            <div className={styles['left-container']}>
                <div className={styles['form-container']}>
                    <div className={styles["create-posting-form"]}>
                        <div className={styles['form-header']}>
                            <button 
                                className={styles['close-button']}
                                onClick={() => router.visit("/dashboard")}>
                                <CloseSVG 
                                    width={"25px"}
                                    color={theme == 'dark' ? 'white' : 'black'}/>
                            </button>
                            <div className={styles['form-title']}>Crear anuncio de trabajo</div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={styles['input-field']}>
                                <TextInput
                                    className={styles['text-input']}
                                    name={"title"} 
                                    type={"text"} 
                                    placeholder={"Escribe el título del trabajo (máximo 50 caracteres)"} 
                                    label={"Título"} 
                                    value={title}
                                    setValue={setTitle}
                                    maxLength={50}
                                />
                            </div>
                            <div className={styles['input-field']}>
                                <TextArea
                                    className={styles['description-input']}
                                    name={"description"}
                                    label={"Descripción"} 
                                    required={true}
                                    maxLength={450}
                                    placeholder={"Escribe una descripción (máximo 450 caracteres)"}
                                    value={description}
                                    setValue={setDescription}/>
                            </div>
                            <div className={`${styles['posting-category-price']} ${styles['input-field']}`}>
                                <CategorySelector 
                                    className={styles['category-selector']}
                                    label={"Categoría"}
                                    value={category}
                                    setValue={setCategory} />
                                <CurrencyInput 
                                    className={styles['currency-input']}
                                    name={"currency"} 
                                    label={"Pago"} 
                                    value={price}
                                    setValue={setPrice}/>
                            </div>
                            <LocationSelector 
                                location={location}
                                setDisplayModal={setSelectLocationModal}/>
                            <ImagesInput 
                                images={images}
                                setImages={setImages}
                                setImagesToPreview={setImagesToPreview}
                                setImageDisplayed={setImagePreviewed}/>
                            <div className={styles['input-field']}>
                                <div className={styles.equipmentInputLabel}>Equipo</div>
                                <div className={styles.equipmentInputDesc}>
                                    El trabajo requiere equipo/equipamento adicional?
                                    <div style={{width: "25px", display: "block"}}>
                                        <label className={styles.checkboxContainer}>
                                            <input className={styles.equipmentInput} name="equipment" type="checkbox" value={equipmentRequired} onChange={(e) => setEquipmentRequired(e.target.value)}/>
                                            <span className={styles.checkmark}></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['create-posting-btn']}>
                                <button
                                    type="submit"
                                    className={styles.submitButton}>
                                    Publicar
                                </button>
                            </div>
                        </form>
                    </div>
                    {selectLocationModal && 
                        <Suspense fallback={<LoadingScreen />}>
                            <SelectLocationModal 
                                setDisplayModal={setSelectLocationModal}
                                location={location}
                                setLocation={setLocation}/>
                        </Suspense>
                    }
                </div>    
            </div>
            <div className={styles['right-container']}>
                <div className={styles['preview-container']}>
                    <div className={styles['preview']}>
                        <div className={styles['preview-title']}>
                            Vista Previa
                        </div>
                        <div className={styles['images-preview-container']}>
                            <div className={styles['images-preview']}>
                                {(images[0] != null || images[1] != null || images[2] != null) &&
                                    //if an image has been uploaded
                                    <>
                                        <img src={imagesToPreview[imagePreviewed]} className={styles['image']}/>
                                        {imagesToPreview.length > 1 &&
                                            <>
                                                <ArrowButton width={"50px"} direction={"right"} click={() => changeImagePreviewed(imagePreviewed+1)} />
                                                <ArrowButton width={"50px"} direction={"left"} click={() => changeImagePreviewed(imagePreviewed-1)} />
                                            </>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}