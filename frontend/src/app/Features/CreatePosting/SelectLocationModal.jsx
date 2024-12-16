import Modal from "@/Components/Modal/Modal";
import styles from "./CreatePosting.module.scss";
import CloseSVG from "@/Components/SVGs/Close";
import { formatAddress } from "@/Utils/account/AccountUtils";
import { useState } from "react";
import CreateLocationModal from "./CreateLocationModal";
import MapModal from "./MapModal";
import axios from "axios";
import TrashcanSVG from "@/Components/SVGs/Trashcan";
import { useMutation } from "@tanstack/react-query";
import Alert from "@/Components/Alert/Alert";
import { useAddedAddresses, useUser } from "@/jotai/user";
import { useTheme } from "@/Hooks/theme";

export default function SelectLocationModal({location, setLocation, setDisplayModal}) {
    const [user] = useUser();
    const [theme] = useTheme();
    const [added_addresses, setAddedAddresses] = useAddedAddresses();

    const [newLocationModal, setNewLocationModal] = useState(false);
    const [mapModal, setMapModal] = useState(false);
    const [deleteAlertModal, setDeleteAlertModal] = useState({
        active: false,
        id: "",
        index: ""
    }); 

    function changeLocation(loc) {
        if(location?.location?.id != loc.id) {
            setLocation({
                location: loc,
                create: false
            });
        }

        if(!loc?.latitude && !loc?.longitude)
            setMapModal(true);
        else
            setDisplayModal(false);
    }

    function createNewLocation() {
        setNewLocationModal(true);
        setLocation();
    }

    const { mutateAsync: deleteAddressFn } = useMutation({
        mutationFn: async (id) => {
            return axios.delete("/address/" + id,
                {
                    withCredentials: true
                }
            );
        }
    })

    async function deleteAddress(id, index) {
        try {
            await deleteAddressFn(id);
            setDeleteAlertModal(false);
            let arr = [...added_addresses];
            arr.splice(index, 1);
            setAddedAddresses(arr);
            
            if(location?.id == id)
                setLocation();
        } catch(error) {
            console.log(error);
        }
    } 

    if(newLocationModal) {
        return (
            <CreateLocationModal 
                user={user}
                location={location}
                setLocation={setLocation}
                setNewLocationModal={setNewLocationModal}
                setMapModal={setMapModal}/>
        )
    }

    if(mapModal) {
        return (
            <MapModal 
                location={location}
                setLocation={setLocation}
                setMapModal={setMapModal}
                setNewLocationModal={setNewLocationModal}
                setSelectLocationModal={setDisplayModal}/>
        )
    }


    return (
        <Modal className={styles.selectLocationModal}>
            <div className={styles.selectLocationModalContainer}>  
                <div className={styles['locations-list-container']}>
                    <ul className={styles['locations-list']}>
                        <li className={styles['locations-list-header-container']}>
                            <div className={styles['locations-list-header']}>
                                <button className={styles['cancel-btn']}
                                    onClick={() => setDisplayModal(false)}>
                                    <CloseSVG width={"20px"} color={theme == 'dark' ? 'white' : 'black'}/>
                                </button>
                                <span>Ubicaciones agregadas</span>
                            </div>
                        </li>
                        {!user?.address &&
                            <li className={styles['no-location-added-disclaimer']}>
                                No tienes ninguna ubicación agregada...
                            </li>
                        }
                        {user?.address &&
                            <li>
                                <button 
                                    className={`${styles['location-card-btn']}`}
                                    onClick={() => changeLocation(user.address)}>
                                        <div className={styles['location-btn-content-container']}>
                                            <input 
                                                className={styles['selected-location']} 
                                                type="radio" 
                                                checked={location?.location?.id == user?.address?.id}
                                                onChange={() => {}}/>
                                            <div>
                                                <div style={{fontWeight: 'bold'}}>
                                                    {user.address.address_name}
                                                </div>
                                                {formatAddress(user.address)}
                                            </div>
                                            
                                        </div>
                                </button>
                            </li>   
                        }
                        {added_addresses && added_addresses.map(function(address, i) {
                            return (
                                <li key={address?.id} style={{position: "relative"}}>
                                    <button 
                                        className={`${styles['location-card-btn']}`}
                                        onClick={() => changeLocation(address)}>
                                            <div className={styles['location-btn-content-container']}>
                                                <input 
                                                    className={styles['selected-location']} 
                                                    type="radio" 
                                                    checked={location?.location?.id == address?.id}
                                                    onChange={() => {}}/>
                                                <div className={styles.locationContent}>
                                                    <div style={{fontWeight: 'bold'}}>
                                                        {address.address_name}
                                                    </div>
                                                    {formatAddress(address)}
                                                </div>
                                                <div 
                                                    className={styles['edit-location-btn']}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        e.preventDefault(); 
                                                        setDeleteAlertModal({
                                                            active: true,
                                                            id: address?.id,
                                                            index: i
                                                        })
                                                    }}>
                                                    <TrashcanSVG width={"20px"} color={theme == 'dark' ? 'white' : 'black'}/>
                                                </div>
                                            </div>
                                    </button>
                                </li>    
                            ) 
                        })}
                        <li>
                            <button 
                                className={styles['add-location-btn']}
                                onClick={() => createNewLocation()}>
                                + Agregar nueva ubicación
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {deleteAlertModal.active && 
                <Alert width={"500px"} height={"165px"}>
                    <div style={{padding: "4px"}}>
                        <div>
                            <h4 style={{marginTop: "6px"}}><b>Al eliminar esta dirección, se eliminarán todas tus publicaciones que tengan esta dirección.</b></h4>
                        </div>
                        <span style={{fontSize: "14px"}}>¿Estás seguro/a que deseas eliminarla?</span>
                        <div className={styles['delete-location-btns']}>
                            <button 
                                className={styles['cancel-delete-address-btn']}
                                onClick={() => setDeleteAlertModal({
                                    active: false,
                                    id: ""
                                })}>
                                Cancelar
                            </button>
                            <button 
                                className={styles['confirm-delete-address-btn']}
                                onClick={() => {
                                    deleteAddress(deleteAlertModal.id, deleteAlertModal.index);
                                }}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </Alert>
            }
        </Modal>
    )
}