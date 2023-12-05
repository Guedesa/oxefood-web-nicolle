import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Radio } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';

export default function FormEntregador() {
    const { state } = useLocation();
    const [idEntragador, setidEntragador] = useState();

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    useEffect(() => {

        if (state != null && state.id != null) {

            axios.get("http://localhost:8082/api/entregador/" + state.id)
                .then((response) => {
                    setidEntragador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.Rg)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
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

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas
        }

        if (idEntragador != null) { //Alteração:
            axios.put("http://localhost:8082/api/entregador/" + idEntragador, entregadorRequest)
                .then((response) => { console.log('Entregador alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um cliente.') })
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/entregador", entregadorRequest)
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


                    {idEntragador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntragador != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    width={9}
                                    label='Nome'
                                    maxLength="100"
                                    value={nome} onChange={e => setNome(e.target.value)}

                                />
                                <Form.Input
                                    required
                                    fluid
                                    width={5}
                                    label='CPF'
                                    value={cpf} onChange={e => setCpf(e.target.value)}
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    label='RG'
                                    value={rg} onChange={e => setRg(e.target.value)}
                                >
                                    <InputMask
                                        required
                                        mask='99.999.999-9'
                                    />
                                </Form.Input>

                            </Form.Group>



                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={6}
                                    value={dataNascimento} onChange={e => setDataNascimento(e.target.value)}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 09/07/2001"

                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}
                                    value={foneCelular} onChange={e => setFoneCelular(e.target.value)}
                                >
                                    <InputMask
                                        mask="(99) 9999.9999"

                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Fixo'
                                    width={6}
                                    value={foneFixo} onChange={e => setFoneFixo(e.target.value)}
                                >
                                    <InputMask
                                        mask="(99) 9999.9999"

                                    />
                                </Form.Input>


                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={6}
                                    value={qtdEntregasRealizadas} onChange={e => setQtdEntregasRealizadas(e.target.value)}
                                >
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={6}
                                >
                                </Form.Input>

                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={14}
                                >
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={3}
                                >
                                </Form.Input>

                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={8}
                                >
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={8}
                                >
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={2}
                                >
                                    <InputMask
                                        required
                                        mask='99999999'
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='UF'

                                >
                                </Form.Input>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Complemento</label>
                                    <input placeholder='' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <label>Ativo :</label>
                                <Form.Field name='reply'
                                    control={Radio}
                                    label='Sim'
                                    value='1'
                                    inverted
                                    icon
                                    labelPosition='left'
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Não'
                                    value='2'
                                    icon
                                    labelPosition='left'
                                />
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
                                <Link to={'/list-entregador'}>Voltar</Link>
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