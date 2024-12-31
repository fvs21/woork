import { determineInputColor } from "@/utils/authentication/DetermineStylesUtils";
import { useEffect } from "react";
import { useState } from "react";
import InputBox from "../ValidatedInput/InputBox";
import InputLabel from "../ValidatedInput/InputLabel";
import ErrorCircleSVG from "../SVGs/ErrorCircle";
import EyeSVG from "../SVGs/Eye";
import { svgColor } from "@/utils/extra/utils";
import { useRef } from "react";
import styles from "./PasswordInput.module.scss";

type PasswordInputProps = {
    name: string;
    className: string;
    value: string;
    setValue: (value: string) => void;
    label?: string;
    placeholder?: string;
    autofocus?: boolean;
    errorMsg?: string;
    [x:string]: any;
}

export default function PasswordInput({
    name,
    className,
    value,
    setValue,
    valid,
    label,
    placeholder,
    autofocus,
    errorMsg,
    ...props
}: PasswordInputProps) {
    const [active, setActive] = useState(false);
    const [color, setColor] = useState("");
    const [visible, setVisible] = useState(false);

    const ref = useRef(null);

    const focus = () => {
        setActive(!active);
    };

    const updateValue = (event) => {
        setValue(event.target.value);
    };

    const changeVisibility = (e) => {
        e.preventDefault();


        setVisible(visible ? false : true)
    };

    useEffect(() => {
        setColor(determineInputColor(active, valid));
    }, [value, valid, active]);

    return (
        <InputBox>
            {label && <InputLabel>{label}</InputLabel>}
            <div 
                className={styles.wrapper}
                onFocus={focus}
                onBlur={focus}
            >
                <input
                    ref={ref}
                    style={{
                        paddingRight: "40px",
                    }}
                    className={`${color} ${className}`}
                    name={name}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={updateValue}
                    required
                    autoFocus={autofocus}
                    autoComplete="current-password"
                    {...props}
                />
                <button
                    type="button"
                    className="seePasswordBtn"
                    onClick={(e) => {
                        changeVisibility(e);
                    }}
                >
                    <EyeSVG
                        width={"20px"}
                        color={svgColor()}
                        type={visible ? 'clear' : 'slashed'}
                    />
                </button>
            </div>
            {!active && !valid && errorMsg && (
                <span className={styles.errorMsg}>
                    <ErrorCircleSVG width={"12px"} color={"rgb(196, 0, 0)"} />
                    {errorMsg}
                </span>
            )}
        </InputBox>
    );
}
