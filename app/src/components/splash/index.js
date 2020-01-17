import React from 'react';
import { Image } from 'react-bootstrap';
import styled from "styled-components";

import logoImage from './../../assets/images/logo-512x512.png';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: #323c46;
`;
const Logo = styled(Image)`
    width: 5rem;
    height: 5rem;
`;

function Splash() {
    return (
        <Container>
            <Logo alt="Icon FilmPlay"
                src={logoImage}
            />
        </Container>
    );
}

export default Splash;