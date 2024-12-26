import Message from "../Message/Message";
import styles from "./ChatContent.module.scss";

export default function ChatContent() {
    return ( 
        <div className={styles.chatContent}>
            <Message content={"Hola"} ownMessage={true} />
            <Message content={"Hola hermano"} ownMessage={false} />
            <Message content={"Que día tienes disponíble"} ownMessage={true} />
            <Message content={"Pasado mañana"} ownMessage={false} />
            <Message content={"Okey"} ownMessage={true} />
            <Message content={"Perfecto hermano. nfidabnfhijalnf djkslnfhdsjkalfg dsbahfjdsanfjdsbafhjdslaf bdhsaj fbdhsu afbdhsufobdsh afbdshajfdbshfdsfdsafdsafds fdbshafjkdbsah fdbshafudibsahfjds "} ownMessage={true} />
        </div>
    )
}