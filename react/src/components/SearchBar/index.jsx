import Styles from "./styles.module.css";
import { forwardRef } from "react";

const SearchBar = forwardRef((props, ref) => {
    return (
        <div
            className={`${"container"} ${"horizon-center-layout"} ${
                props.className
            }`}
        >
            <input
                id={Styles["search-input"]}
                type="text"
                placeholder={props.placeholder}
                ref={ref}
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
});

export default SearchBar;
