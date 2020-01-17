import React from 'react';
import styled from "styled-components";
import { Row, Col, Button } from 'react-bootstrap';

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
const ModalMessage = styled.div`
    margin: auto;
    padding: 1rem;
`;
const ModalMessageBody = styled.div`
    padding: 1rem;
    border-radius: 0.5rem;
    background: #fff;
`;
const ButtonOk = styled(Button)`
    margin-top: 1rem;
    color: #fff;
    background-color: #323c46;
    border: none;

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


function Message({ value, callbackOk }) {
    return (
        <ModalContainer>
            <ModalMessage>
                <ModalMessageBody>
                    <Row>
                        <Col lg={12}>
                            {value}
                        </Col>
                        <Col lg={12}>
                            <ButtonOk variant="light" type="button" onClick={callbackOk}>
                                ok
                            </ButtonOk>
                        </Col>
                    </Row>
                </ModalMessageBody>
            </ModalMessage> 
        </ModalContainer>
    );
}

export default Message;