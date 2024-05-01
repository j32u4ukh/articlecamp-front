import Styles from "./styles.module.css";

// TODO: input 和 button 的監聽器或 ref
export default function SearchBar(props) {
    return (
        <div
            className={`${"container"} ${"horizon-center-layout"} ${
                Styles["search-bar"]
            }`}
        >
            <input
                id={Styles["search-input"]}
                type="text"
                placeholder={props.placeholder}
                ref={props.ref}
            />
            <button
                id={`${Styles["search-btn"]}`}
                className={`${"btn"} ${"c-border"}`}
                onClick={props.onClick}
            >
                Search
            </button>
        </div>
    );
}
