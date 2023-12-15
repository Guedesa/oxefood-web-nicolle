import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Header, Icon, Menu, Modal, Segment, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListCliente() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    // aula 24//
    const [menuFiltro, setMenuFiltro] = useState();
    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [idCategoria, setIdCategoria] = useState();
    const [listaCategoriaCliente, setListaCategoriaCliente] = useState([]);


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8082/api/cliente")
            .then((response) => {
                setLista(response.data)
            })
        axios.get("http://localhost:8082/api/CategoriaCliente")
            .then((response) => {

                const dropDownCategorias = [];
                dropDownCategorias.push({ text: '', value: '' });
                response.data.map(c => (
                    dropDownCategorias.push({ text: c.descricao, value: c.id })
                ))

                setListaCategoriaCliente(dropDownCategorias)

            })

    }


    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }
    async function remover() {

        await axios.delete('http://localhost:8082/api/cliente/' + idRemover)
            .then((response) => {

                console.log('Cliente removido com sucesso.')

                axios.get("http://localhost:8082/api/cliente")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um cliente.')
            })
        setOpenModal(false)
    }
    function handleMenuFiltro() {

        if (menuFiltro === true) {
            setMenuFiltro(false);
        } else {
            setMenuFiltro(true);
        }
    }

    function handleChangeCodigo(value) {

        filtrarCliente(value, titulo, idCategoria);
    }

    function handleChangeTitulo(value) {

        filtrarCliente(codigo, value, idCategoria);
    }

    function handleChangeCategoriaCliente(value) {

        filtrarCliente(codigo, titulo, value);
    }
    async function filtrarCliente(codigoParam, tituloParam, idCategoriaParam) {

        let formData = new FormData();

        if (codigoParam !== undefined) {
            setCodigo(codigoParam)
            formData.append('codigo', codigoParam);
        }
        if (tituloParam !== undefined) {
            setTitulo(tituloParam)
            formData.append('titulo', tituloParam);
        }
        if (idCategoriaParam !== undefined) {
            setIdCategoria(idCategoriaParam)
            formData.append('idCategoria', idCategoriaParam);
        }

        await axios.post("http://localhost:8082/api/cliente/filtrar", formData)
            .then((response) => {
                setLista(response.data)
            })
    }




    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Menu compact>
                            <Menu.Item
                                name='menuFiltro'
                                active={menuFiltro === true}
                                onClick={() => handleMenuFiltro()}
                            >
                                <Icon name='filter' />
                                Filtrar
                            </Menu.Item>
                        </Menu>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cliente'
                        />
                        {menuFiltro ?

                            <Segment>
                                <Form className="form-filtros">

                                    <Form.Input
                                        icon="search"
                                        value={codigo}
                                        onChange={e => handleChangeCodigo(e.target.value)}
                                        label='Código do Produto'
                                        placeholder='Filtrar por Código do Produto'
                                        labelPosition='left'
                                        width={4}
                                    />
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            icon="search"
                                            value={titulo}
                                            onChange={e => handleChangeTitulo(e.target.value)}
                                            label='Título'
                                            placeholder='Filtrar por título'
                                            labelPosition='left'
                                        />
                                        <Form.Select
                                            placeholder='Filtrar por Categoria'
                                            label='Categoria'
                                            options={listaCategoriaCliente}
                                            value={idCategoria}
                                            onChange={(e, { value }) => { handleChangeCategoriaCliente(value) }}
                                        />

                                    </Form.Group>
                                </Form>
                            </Segment> : ""
                        }


                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(cliente => (

                                    <Table.Row key={cliente.id}>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{(cliente.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                        <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>&nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
                                                icon
                                                onClick={e => confirmaRemover(cliente.id)}>

                                                <Icon name='trash' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}