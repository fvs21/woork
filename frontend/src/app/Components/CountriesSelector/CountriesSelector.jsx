import styles from "./CountriesSelector.module.scss";

export default function CountriesSelector({name, list, value, clsName, setValue, disabled}) {
  return (
    <select name={name} defaultValue={value} onChange={setValue} className={`${clsName} ${styles.input}`} required>
      {disabled && <option value={""} disabled>{disabled}</option>}
      {list.map(function(opt) {
        return <option key={opt} value={opt}>{opt}</option>
      })}
    </select>
  )
}
