import React from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import styled from "styled-components";

const CustomNav = styled(Nav)`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

function Navigation({ location, history }) {

    return (
        <CustomNav 
            variant="pills" 
            className="justify-content-center" 
            activeKey={location.pathname}
        >
            <Nav.Item>
                <Nav.Link as={NavLink} to="/movie" exact>Filmes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/serie" exact>Séries</Nav.Link>
            </Nav.Item>
        </CustomNav>
    );
}

export default withRouter(Navigation);
