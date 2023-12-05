import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';
export default function FormProduto() {
    const { state } = useLocation();
    const [idProduto, setidProduto] = useState();

    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
    const [listaCategoria, setListaCategoria] = useState([]);
    const [idCategoria, setIdCategoria] = useState();


    useEffect(() => {


        if (state != null && state.id != null) {

            axios.get("http://localhost:8082/api/produto/" + state.id)
                .then((response) => {
                    setidProduto(response.data.id)
                    setCodigo(response.data.codigo)
                    setTitulo(response.data.setTitulo)
                    setDescricao(response.data.descricao)
                    setValorUnitario(response.data.valorUnitario)
                    setTempoEntregaMaximo(response.data.tempoEntregaMinimo)
                    setTempoEntregaMinimo(response.data.tempoEntregaMaximo)
                    setIdCategoria(response.data.categoria.id)

                })
        }
        axios.get("http://localhost:8082/api/CategoriaProduto")
            .then((response) => {
                const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
                setListaCategoria(dropDownCategorias);
            })



    }, [state])
    function salvar() {

        let produtoRequest = {
            idCategoria: idCategoria,
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo,
        }

        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8082/api/produto/" + idProduto, produtoRequest)
                .then((response) => { console.log('Produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um produto.') })
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/produto", produtoRequest)
                .then((response) => {
                    notifySuccess('Cliente cadastrado com sucesso.')
                })

                .catch((error) => {
                    if (error.response) {
                        notifyError(error.response.data.errors[0].defaultMessage)

                    } else {
                        notifyError(mensagemErro)
                    }
                })

        }
    }
    return (

        <div>

            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >


                    {idProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idProduto != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    maxLength="100"
                                    placeholder="informe o titulo do produto"
                                    value={titulo} onChange={e => setTitulo(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='codigo do produto'
                                    value={codigo} onChange={e => setCodigo(e.target.value)}
                                >

                                    <InputMask
                                        required
                                        placeholder=" informe  código do produto"
                                    />
                                </Form.Input>

                            </Form.Group>
                            <Form.Select
                                required
                                fluid
                                tabIndex='3'
                                placeholder='Selecione'
                                label='Categoria'
                                options={listaCategoria}
                                value={idCategoria}
                                onChange={(e, { value }) => {
                                    setIdCategoria(value)
                                }}
                            />



                            <Form.TextArea label='Descrição' placeholder='Informe a descrição do produto'
                                value={descricao} onChange={e => setDescricao(e.target.value)}

                            >
                            </Form.TextArea>

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor unitario'
                                    width={6}
                                    value={valorUnitario} onChange={e => setValorUnitario(e.target.value)}
                                >
                                    
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='tempo de entrega minima em minutos'
                                    width={6}
                                    value={tempoEntregaMinimo} onChange={e => setTempoEntregaMaximo(e.target.value)}
                                >
                                    <InputMask


                                        placeholder="30"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='tempo de entrega maxima em minutos'
                                    width={6}
                                    value={tempoEntregaMaximo} onChange={e => setTempoEntregaMinimo(e.target.value)}
                                >
                                    <InputMask


                                        placeholder="40"
                                    />
                                </Form.Input>

                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
                            </Button>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}