import React, { useContext, useState } from "react";
import styles from "./Search.module.scss";
import { SerchContex } from "../../App";
import { useRef, useCallback } from "react";
import { debounce } from "lodash";

export default function Serch() {
  const [value, setValeu] = useState("");
  const { setSearchValue } = useContext(SerchContex);
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
    setValeu(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    setSearchValue("");
    setValeu("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event)}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      {value && (
        <svg
          onClick={() => onClickClear()}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g id="Menu / Close_MD">
            <path
              id="Vector"
              d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      )}
    </div>
  );
}
