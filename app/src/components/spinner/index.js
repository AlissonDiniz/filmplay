import React from 'react';
import styled from "styled-components";

const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1031;
    text-align: center;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
`;
const ModalSpinner = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
    margin: auto;
    background: #fff;
`;
const ModalIcon = styled.i`
    font-size: 2em;
    margin-top: 1.5rem
`;


function Spinner() {
    return (
        <ModalContainer>
            <ModalSpinner>
                <ModalIcon className="fas fa-spinner fa-spin"></ModalIcon>
            </ModalSpinner> 
        </ModalContainer>
    );
}

export default Spinner;