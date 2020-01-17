import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from "styled-components";

import Header from './components/header';
import Splash from './components/splash';

import LoginContainer from './container/login';
import MovieContainer from './container/movie';
import SerieContainer from './container/serie';

const Wrapper = styled.div`
`;

function ContainerManager() {
    const token = localStorage.getItem('@filmplay-app/token');
    if (!token) {
        return <Redirect to="/login" />;
    }

    return (
        <Wrapper>
            <Header />
            <Container fluid={true}>
                <Route exact path="/">
                    <Redirect to="/movie" />
                </Route>
                <Route path="/movie" component={MovieContainer} />
                <Route path="/serie" component={SerieContainer} />
            </Container>
        </Wrapper>
    );
}

function AppComponent({ loading }) {
    if (loading) {
        return <Splash />;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={LoginContainer} />
                <Route path="/" component={ContainerManager} />
            </Switch>
        </BrowserRouter>
    );
}

export default function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    });

    return <AppComponent loading={loading} />
}