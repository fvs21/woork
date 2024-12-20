import Modal from "@/components/Modal/Modal";
import styles from "./CreatePosting.module.scss";
import CloseSVG from "@/components/SVGs/Close";
import { formatAddress } from "@/utils/account/AccountUtils";
import { useState } from "react";
import CreateLocationModal from "./CreateLocationModal";
import MapModal from "./MapModal";
import axios from "axios";
import TrashcanSVG from "@/components/SVGs/Trashcan";
import { useMutation } from "react-query";
import Alert from "@/components/Alert/Alert";
import { useUser } from "@/api/hooks/user";
import { useTheme } from "@/hooks/theme";
import { useDeleteAddress, useGetCreatedAddresses } from "@/api/hooks/postings";
import LoadingModal from "@/components/LoadingModal/LoadingModal";

export default function SelectLocationModal({location, setLocation, setDisplayModal}) {
    const [user] = useUser();
    const [theme] = useTheme();

    const { data: added_addresses, isLoading } = useGetCreatedAddresses();
    const { deleteAddrs } = useDeleteAddress();

    const [newLocationModal, setNewLocationModal] = useState(false);
    const [mapModal, setMapModal] = useState(false);
    const [deleteAlertModal, setDeleteAlertModal] = useState({
        active: false,
        id: "",
        index: ""
    }); 

    function changeLocation(newLocation) {
        if(location?.location?.id != newLocation.id) {
            setLocation({
                location: newLocation,
                create: false
            });
        }

        if(!newLocation?.latitude && !newLocation?.longitude)
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
    });

    if(isLoading) {
        return (
            <LoadingModal />
        )
    }

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