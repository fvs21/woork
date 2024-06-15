import { useState } from "react";
import Modal from "../../components/Modal/Modal";

export default function AddressModal({changeDisplayModal}) {
    return (
        <Modal>
            <div className={'information-modal'}>
                <button onClick={() => changeDisplayModal(false)}>X</button>
                <h2>Dirección</h2>
            </div>
        </Modal>
    )
}