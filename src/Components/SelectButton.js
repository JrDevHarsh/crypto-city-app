import React from "react";

function SelectButton({ children, selected, onClick }) {
    return <span style={{
        cursor: 'pointer',
        border: '1px solid gold',
        borderRadius: 5,
        padding: '10px 20px',
        color: selected ? 'black' : '',
        backgroundColor: selected ? 'gold' : '',
        fontWeight: selected ? 700 : 500
    }} onClick={onClick}>{children}</span>;
}

export default SelectButton;
