import React from 'react';
import { Navbar, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import logoImage from './../../assets/images/logo-512x512.png';
import TokenManager from './../../utils/token-manager';

const ButtonSignOut = styled.a`
    cursor: pointer;
`;

function Header({ history }) {

    const signOut = () => {
        TokenManager.signOut(history);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <Image
                    alt="Icon FilmPlay"
                    src={logoImage}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                FilmPlay
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <ButtonSignOut onClick={() => signOut()}>
                        <i className="fas fa-sign-out-alt"></i>
                        &nbsp;
                        Sair
                    </ButtonSignOut>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Header);
