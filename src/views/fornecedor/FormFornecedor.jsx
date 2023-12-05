import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';
/*id Long EntidadeNegocio
...
versao Long EntidadeAuditavel
...
nome String Fornecedor
endereco String Fornecedor
dataFundacao LocalDate Fornecedor
valorMercado Double Fornecedor
paginaWeb String Fornecedor
contatoVendedor String Fornecedor*/
export default function FormFornecedor() {
    const { state } = useLocation();
    const [idFornecedor, setIdFornecedor] = useState();

    const [nome, setNome] = useState();
    const [endereco, setEndereco] = useState();
    const [dataFundacao, setDataFundacao] = useState();
    const [valorMercado, setvalorMercado] = useState();
    const [paginaWeb, setpaginaWeb] = useState();
    const [contatoVendedor, setcontatoVendedor] = useState();
    useEffect(() => {

        if (state != null && state.id != null) {

            axios.get("http://localhost:8082/api/fornecedor/" + state.id)
                .then((response) => {
                    setIdFornecedor(response.data.id)
                    setNome(response.data.nome)
                    setEndereco(response.data.endereco)
                    setDataFundacao(formatarData(response.data.dataFundacao))
                    setvalorMercado(response.data.valorMercado)
                    setpaginaWeb(response.data.paginaWeb)
                    setcontatoVendedor(response.data.contatoVendedor)
                })
        }

    }, [state])

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function salvar() {

        let fornecedorRequest = {
            nome: nome,
            endereco: endereco,
            dataFundacao: dataFundacao,
            valorMercado: valorMercado,
            contatoVendedor: contatoVendedor,
            paginaWeb: paginaWeb,
        }

        if (idFornecedor != null) { //Alteração:
            axios.put("http://localhost:8082/api/fornecedor/" + idFornecedor, fornecedorRequest)
                .then((response) => { console.log('Fornecedor alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um Fornecedor.') })
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/fornecedor", fornecedorRequest)
                .then((response) => {
                    notifySuccess('Cliente cadastrado com sucesso.')
                })

                .catch((error) => {
                    if (error.response) {
                        notifyError(error.response.data.error)
                        console.log(error.response)
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

                    {idFornecedor === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Fornecedor &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idFornecedor != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Fornecedor &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>


                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome} onChange={e => setNome(e.target.value)}

                                />
                                <Form.Input
                                    fluid
                                    label='dataFundacao'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataFundacao} onChange={e => setDataFundacao(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>

                                <Form.Input

                                    fluid
                                    label='Endereco'
                                    width={16}
                                >

                                    <InputMask
                                        required
                                        value={endereco} onChange={e => setEndereco(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='ValorMercado'
                                    width={6}>
                                    <InputMask

                                        value={valorMercado} onChange={e => setvalorMercado(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='ContatoVendedor'
                                    width={10}
                                >
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        maskChar={null}
                                        value={contatoVendedor} onChange={e => setcontatoVendedor(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='PaginaWeb'
                                    width={16}>
                                    <InputMask

                                        value={paginaWeb} onChange={e => setpaginaWeb(e.target.value)}
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
                                <Link to={'/list-fornecedor'}>Voltar</Link>
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
            </div >
        </div >

    );
}