import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    visibility: visible;
    -webkit-animation: snackbar-fadein 0.5s, snackbar-fadeout 0.5s 4.5s;
    animation: snackbar-fadein 0.5s, snackbar-fadeout 0.5s 4.5s;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1040;

    background-color: #4caf50;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 0.8rem;

    font-size: 1em;
`;

function SnackBar({ value }) {
    return (
        <Container>
            {Array.isArray(value) && value.map((it, i) => {
                return <span key={`span-${i}`}>{it}<br /></span>
            })}
            {!Array.isArray(value) && value}
        </Container>
    );
}

export default SnackBar;
