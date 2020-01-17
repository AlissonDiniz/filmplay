import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Table, Row, Col, Form, FormControl, Button, Modal, Alert } from 'react-bootstrap';

import Navigation from './../../components/navigation';
import Spinner from './../../components/spinner';
import Paginator from './../../components/paginator';
import SnackBar from './../../components/snackbar';
import SortColumn from './../../components/sort-column';

import TokenManager from './../../utils/token-manager';
import movieService from './../../service/movie-service';


class MovieContainer extends React.Component {

    constructor(props) {
        super(props);
        this.limitPage = 6;
        this.state = {
            showSpinner: true,
            showModalRegister: false,
            showModalRemove: false,
            showModalEdit: false,
            showSuccessAlert: false,
            successAlertMessage: '',
            movieToRemoveId: null,
            movieToEditId: null,
            editForm: {
                title: '',
                synopsis: '',
                minutes: ''
            },
            registerForm: {
                title: '',
                synopsis: '',
                minutes: ''
            },
            filterName: '',
            filtered: false,
            data: {
                sort: null,
                order: null,
                page: 1,
                size: 5,
                content: [],
                totalPages: 0
            }
        };

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { page, sort, order } = this.state.data;
        this._loadData(page, sort, order);
    }

    _loadData = (page, sort, order) => {
        const self = this;
        self.setState({ showSpinner: true, data: { ...this.state.data, page, sort, order } });
        movieService.getAll(this.state.filterName, page, this.state.data.size, sort, order)
            .then((response) => {
                self.setState({ showSpinner: false, data: { ...this.state.data, ...response.data } });
            }).catch((error) => {
                if (error.status === 401) {
                    TokenManager.signOut(self.props.history);
                }
            });
    }

    _cleanFilter = (callback) => {
        const self = this;
        self.setState({ filtered: false, filterName: '' });
        const { size } = this.state.data;
        movieService.getAll(null, 1, size, null, null)
            .then((response) => {
                self.setState({ showSpinner: false, data: { ...this.state.data, ...response.data } });
                if (callback) {
                    callback();
                }
            }).catch((error) => {
                if (error.status === 401) {
                    TokenManager.signOut(self.props.history);
                }
            });
    }

    _onChangeSearchInput = (event) => {
        this.setState({ filterName: event.target.value });
        if (!event.target.value) {
            this._cleanFilter();
        }
    };

    _doSearch = () => {
        this.setState({ filtered: true });
        this._loadData(1, null, null);
    }

    _onShowModalRegister = () => {
        this.setState({ showModalRegister: true });
    }

    _onChangeRegisterForm = (field, event) => {
        const { registerForm } = this.state;
        registerForm[field] = event.target.value;
        this.setState({ registerForm: { ...registerForm } });
    }

    _onHideModalRegister = () => {
        const registerForm = {
            title: '',
            synopsis: '',
            minutes: ''
        };
        this.setState({ showModalRegister: false, registerForm });
    }

    _onShowModalRemove = (movieToRemoveId) => {
        this.setState({ showModalRemove: true, movieToRemoveId });
    }

    _onHideModalRemove = () => {
        this.setState({ showModalRemove: false });
    }
    
    _doCreate = () => {
        const self = this;
        const { registerForm, data } = self.state;
        self.setState({ showSpinner: true, showModalRegister: false, registerForm: { name: '' } });
        movieService.create(registerForm)
            .then(() => {
                self.setState({ showSuccessAlert: true, successAlertMessage: 'Filme salvo com sucesso!' });
                self._cleanFilter(() => {
                    setTimeout(function () { self.setState({ showSuccessAlert: false, successAlertMessage: '' }) }, 3000);
                });
            }).catch((error) => {
                if (error.status === 401) {
                    TokenManager.signOut(self.props.history);
                }
            });
    }

    _doDelete = () => {
        const self = this;
        const { movieToRemoveId } = self.state;
        self.setState({ showSpinner: true, showModalRemove: false, movieToRemoveId: null });
        movieService.delete(movieToRemoveId)
            .then(() => {
                self.setState({ showSuccessAlert: true, successAlertMessage: 'Filme removido com sucesso!' });
                self._cleanFilter(() => {
                    setTimeout(function () { self.setState({ showSuccessAlert: false, successAlertMessage: '' }) }, 3000);
                });
            }).catch((error) => {
                if (error.status === 401) {
                    TokenManager.signOut(self.props.history);
                }
            });
    }

    _sortColumn = (columnName, order) => {
        const { page } = this.state.data;
        this._loadData(page, columnName, order);
    };

    _onShowModalEdit = (movieToEdit) => {
        const editForm = {
            title: movieToEdit.title,
            synopsis: movieToEdit.synopsis,
            minutes: movieToEdit.minutes
        };
        this.setState({ showModalEdit: true, movieToEditId: movieToEdit.id, editForm });
    }

    _onHideModalEdit = () => {
        const editForm = {
            title: '',
            synopsis: '',
            minutes: ''
        };
        this.setState({ showModalEdit: false, movieToEditId: null, editForm });
    }

    _onChangeEditForm = (field, event) => {
        const { editForm } = this.state;
        editForm[field] = event.target.value;
        this.setState({ editForm: { ...editForm } });
    }

    _doUpdate = () => {
        const self = this;
        const { movieToEditId, editForm } = self.state;
        self.setState({ showSpinner: true, showModalEdit: false, movieToEditId: null, editForm: { name: '' } });
        movieService.update(movieToEditId, editForm)
            .then(() => {
                self.setState({ showSuccessAlert: true, successAlertMessage: 'Filme alterado com sucesso!' });
                self._cleanFilter(() => {
                    setTimeout(function () { self.setState({ showSuccessAlert: false, successAlertMessage: '' }) }, 3000);
                });
            }).catch((error) => {
                if (error.status === 401) {
                    TokenManager.signOut(self.props.history);
                }
            });
    }

    render() {
        const { registerForm, editForm } = this.state; 
        let validRegisterForm = false;
        if (registerForm.title && registerForm.synopsis && registerForm.minutes) {
            validRegisterForm = true;
        }
        let validEditForm = false;
        if (editForm.title && editForm.synopsis && editForm.minutes) {
            validEditForm = true;
        }

        return (
            <Container fluid={true}>
                <Navigation />
                <Row>
                    <Col sm={12} md={6}>
                        <Button variant="outline-primary" onClick={this._onShowModalRegister}>
                            <i className="fas fa-plus"></i>
                            &nbsp;Novo Filme
                        </Button>
                    </Col>
                    <Col sm={12} md={6}>
                        <Form className="float-right" inline>
                            <FormControl type="text" className="mr-sm-2" onChange={this._onChangeSearchInput} value={this.state.filterName} />
                            {(!this.state.filtered || !this.state.filterName) && <Button variant="outline-primary" onClick={this._doSearch}>
                                <i className="fas fa-search"></i>
                            </Button>}
                            {(this.state.filtered && this.state.filterName)  && <Button variant="outline-primary" onClick={this._cleanFilter}>
                                <i className="fas fa-times"></i>
                            </Button>}
                        </Form>
                    </Col>
                </Row>
                <br />
                {this.state.showSuccessAlert && <Alert key="alert-success" variant="success">
                    {this.state.successAlertMessage}
                </Alert>}
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th style={{minWidth: "6rem"}}>
                                <SortColumn title="Título" colunmName="title" pageable={this.state.data} callback={this._sortColumn} />
                            </th>
                            <th>Sinopse</th>
                            <th style={{minWidth: "6.5rem"}}>
                                <SortColumn title="Duração" colunmName="minutes" pageable={this.state.data} callback={this._sortColumn} />
                            </th>
                            <th style={{width: "6rem"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.content.map((it, ix) => {
                            return <tr key={`movie-${it.id}`}>
                                <td style={{minWidth: "6rem"}}>{it.title}</td>
                                <td>{it.synopsis}</td>
                                <td style={{minWidth: "6.5rem"}}>{it.minutes} minutos</td>
                                <td style={{width: "6rem"}}>
                                    <Button variant="outline-primary" size="sm" className="mr-sm-2" onClick={() => this._onShowModalEdit(it)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => this._onShowModalRemove(it.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Paginator loadData={this._loadData} limitPage={this.limitPage} pageable={this.state.data} />
                {this.state.spinner && <Spinner />}
                
                <Modal key="modal-register" show={this.state.showModalRegister} onHide={this._onHideModalRegister} >
                    <Modal.Header closeButton>
                        <Modal.Title>Novo Filme</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Form>
                                <Form.Group controlId="title">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" placeholder="Título do Filme" onChange={event => this._onChangeRegisterForm("title", event)} />
                                </Form.Group>
                                <Form.Group controlId="synopsis">
                                    <Form.Label>Sinopse</Form.Label>
                                    <Form.Control as="textarea" rows="5" placeholder="Sinopse do Filme" onChange={event => this._onChangeRegisterForm("synopsis", event)} />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="minutes">
                                        <Form.Label>Duração</Form.Label>
                                        <Form.Control type="number" placeholder="Minutos" onChange={event => this._onChangeRegisterForm("minutes", event)} />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this._onHideModalRegister} >
                            Fechar
                        </Button>
                        <Button variant="primary" disabled={!validRegisterForm} onClick={this._doCreate} >
                            Criar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal key="modal-edit" show={this.state.showModalEdit} onHide={this._onHideModalEdit} >
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Filme</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                        <Form>
                            <Form.Group controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Título do Filme" value={this.state.editForm.title} onChange={event => this._onChangeEditForm("title", event)} />
                            </Form.Group>
                            <Form.Group controlId="synopsis">
                                <Form.Label>Sinopse</Form.Label>
                                <Form.Control as="textarea" rows="5" placeholder="Sinopse do Filme" value={this.state.editForm.synopsis} onChange={event => this._onChangeEditForm("synopsis", event)} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="minutes">
                                    <Form.Label>Duração</Form.Label>
                                    <Form.Control type="number" placeholder="Minutos" value={this.state.editForm.minutes} onChange={event => this._onChangeEditForm("minutes", event)} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this._onHideModalEdit} >
                            Fechar
                        </Button>
                        <Button variant="primary" disabled={!validEditForm} onClick={this._doUpdate} >
                            Alterar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal key="modal-remove" show={this.state.showModalRemove} onHide={this._onHideModalRemove} >
                    <Modal.Header closeButton>
                        <Modal.Title>Remover Filme</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Deseja remover o Filme?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this._onHideModalRemove} >
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={this._doDelete} >
                            Remover
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

export default withRouter(MovieContainer);
