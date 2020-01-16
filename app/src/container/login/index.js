import React from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";

import logoImage from './../../assets/images/logo-512x512.png';

import authService from './../../service/auth-service';
import TokenManager from './../../utils/token-manager';

import Spinner from './../../components/spinner';
import Message from './../../components/message';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    font-size: 0.9em;
    background-color: #323c46;
`;
const Logo = styled(Image) `
    width: 5rem;
    height: 5rem;
`;
const FormContainer = styled(Form) `
    margin-top: 5rem;
    margin-bottom: 2rem;
`;
const FormGroup = styled(Form.Group) `
    position: relative;
    margin-top: 1.5rem;
`;
const FormControl = styled(Form.Control) `
    padding-top: 1.3rem;
    padding-bottom: 1.3rem;
    background-color: #323c46;
    border-color: #fff;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    color: #fff;
    font-size: 1em;

    :focus {
        background-color: #323c46;
        border-color: #fff;
        color: #fff;
        box-shadow: none;
    }
    ::-webkit-input-placeholder {
        color: #fff;
        opacity: .8;
    }

    ::-moz-placeholder {
        color: #fff;
        opacity: .8;
    }

    ::-ms-placeholder {
        color: #fff;
        opacity: .8;
    }

    ::placeholder {
        color: #fff;
        opacity: .8;
    }
`;
const FormGroupPassword = styled(FormGroup) `
    position: relative;
`;
const ButtonLogin = styled(Button) `
    background-color: #323c46;
    border: none;
    margin-top: -0.2rem;

    :focus, :active, :hover, :disabled {
        background-color: #323c46;
        border: none;
        box-shadow: none;
    }
    :not(:disabled):not(.disabled):active {
        background-color: #323c46;
        border: none;
    }
`;
const ColButtonLogin = styled.div`
    margin-right: 0;
`;


class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            showMessage: false,
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    _signIn = (event) => {
        this.setState({ showSpinner: true });
        authService.signIn(this.state.username, this.state.password)
            .then((data) => {
                this.setState({ showSpinner: false }, () => {
                    TokenManager.putUserToken(data.access_token);
                    this.props.history.push("/");
                });
            })
            .catch((data) => {
                this.setState({ showSpinner: false, showMessage: true });
            });
        event.preventDefault();
    }

    _onChangeUsername = (event) => {
        this.setState({ username: event.target.value });
    };
    _onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };
    _onClickMessageOk = () => {
        this.setState({ showMessage: false });
    };

    render() {
        return (
            <Wrapper>
                {this.state.showSpinner && <Spinner />}
                {this.state.showMessage && <Message value="Desculpe, não encontramos um usuário com esse e-mail e senha!" callbackOk={this._onClickMessageOk} />}
                <Row className="h-100 w-100">
                    <Col className="my-auto">
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Logo src={logoImage} />
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={8} lg={6}>
                                <FormContainer onSubmit={this._signIn}>
                                    <FormGroup controlId="formBasicEmail">
                                        <FormControl type="email" placeholder="E-MAIL" value={this.state.username} onChange={this._onChangeUsername} />
                                    </FormGroup>
                                    <FormGroupPassword controlId="formBasicPassword">
                                        <FormControl type="password" placeholder="SENHA" ref={this.inputPassword} value={this.state.password} onChange={this._onChangePassword} />
                                    </FormGroupPassword>
                                    <ColButtonLogin>
                                        <ButtonLogin disabled={!this.state.username || !this.state.password} className="float-right" size="lg" variant="primary" type="submit">
                                            Entrar
                                        </ButtonLogin>
                                    </ColButtonLogin>
                                </FormContainer>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Wrapper>
        );
    }
}


export default withRouter(LoginContainer);