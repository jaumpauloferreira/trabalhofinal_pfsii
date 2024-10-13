import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import './InscreverCandidato.css';

function InscreverCandidato({ onNewInscricao }) {
    const [vagas, setVagas] = useState([]);
    const [candidatos, setCandidatos] = useState([]);
    const [validado, setValidado] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inscricaoData, setInscricaoData] = useState({
        cand_cpf: "",
        vaga_codigo: ""
    });

    function buscarCandidatos() {
        fetch('http://localhost:4000/candidatos', { method: "GET" })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status) {
                    if (retorno.listaCandidatos !== undefined) {
                        setCandidatos(retorno.listaCandidatos);
                    } else {
                        console.error("Lista de candidatos não foi encontrada na resposta do servidor.");
                    }
                } else {
                    console.error("Erro ao buscar candidatos:", retorno.error);
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar candidatos:", erro.message);
                setCandidatos([{
                    cpf: 0,
                    nome: "Erro ao recuperar candidatos " + erro.message
                }]);
            })
    }

    function buscarVagas() {
        fetch('http://localhost:4000/vagas', { method: "GET" })
            .then(resposta => resposta.json())
            .then(retorno => {
                if (retorno.status) {
                    if (retorno.listaVagas !== undefined) {
                        setVagas(retorno.listaVagas);
                    } else {
                        console.error("Lista de vagas não foi encontrada na resposta do servidor.");
                    }
                } else {
                    console.error("Erro ao buscar vagas:", retorno.error);
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar vagas:", erro.message);
                setVagas([{
                    codigo_vaga: 0,
                    cargo: "Erro ao recuperar vagas " + erro.message
                }]);
            })
    }

    useEffect(() => {
        buscarCandidatos();
        buscarVagas();
    }, []);

    function selecionarCandidato(evento) {
        const cpfCandidato = evento.currentTarget.value;
        setInscricaoData({ ...inscricaoData, cand_cpf: cpfCandidato });
    }

    function selecionarVaga(evento) {
        const codigoVaga = evento.currentTarget.value;
        setInscricaoData({ ...inscricaoData, vaga_codigo: codigoVaga });
    }

    function selecionarData(evento) {
        const dataInscricao = evento.currentTarget.value;
        setInscricaoData({ ...inscricaoData, data_inscricao: dataInscricao });
    }

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (form.checkValidity() === false) {
            setValidado(true);
        }
        else {
            setValidado(false);
            fetch('http://localhost:4000/inscricoes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inscricaoData)
            })
                .then(res => res.json())
                .then(retorno => {
                    if (retorno.status) {
                        setSuccessMessage(retorno.mensagem);
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 5000);
                        limparFormulario();

                        // Função onNewInscricao para atualizar a tabela
                        if (onNewInscricao) {
                            onNewInscricao();
                        }
                    } else {
                        setErrorMessage(retorno.mensagem);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    }
                })
                .catch(erro => {
                    alert("Erro: " + erro.message);
                })
        }
    }

    const limparFormulario = () => {
        setInscricaoData({
            cand_cpf: "",
            vaga_codigo: "",
            data_inscricao: ""
        });
    }

    return (
        <div>
            <div className="section-title text-center position-relative pb-3 mx-auto">
                <h3 id='teste' className="fw-bold text-uppercase">
                    <i className="bi bi-person-badge-fill"> </i>
                    INSCRIÇÕES
                </h3>
            </div>
            <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <div className="form-group borda-form ">
                            <Form.Label>Candidato:</Form.Label>
                            <Form.Select id='cand_cpf' name='cand_cpf' className="form-select form-control form-control-sm" onChange={selecionarCandidato}>
                                <option key={0} value={0}>Selecione</option>
                                {
                                    candidatos.map((candidato) => {
                                        return (
                                            <option key={candidato.cpf} value={candidato.cpf}>{candidato.cpf} - {candidato.nome}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </div>
                        <Form.Control.Feedback type='invalid'>Por favor, informe um candidato.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Vaga:</Form.Label>
                        <Form.Select id='vaga_codigo' name='vaga_codigo' className="form-select form-control form-control-sm" onChange={selecionarVaga}>
                            <option key={0} value={0}>Selecionar vaga</option>
                            {
                                vagas.map((vag) => {
                                    return (
                                        <option key={vag.codigo} value={vag.codigo}>{vag.cargo}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>Por favor, informe a vaga.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <div className="form-group borda-form ">
                            <Form.Label >Data:</Form.Label>
                            <Form.Group>
                                <div>
                                    <Form.Control
                                        type="date"
                                        id='data_inscricao'
                                        name='data_inscricao'
                                        required
                                        onChange={selecionarData}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Por favor, informe a data.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Group>
                        </div>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Form.Group>
                            <div className="botoes">
                                <div>
                                    <button type="submit" id='cadastrar' className="btn btn-primary py-1 px-3 btn-gradient">
                                        CADASTRAR
                                    </button>
                                    <button type="reset" className="btn btn-primary py-1 px-3 btn-gradient" onClick={limparFormulario}>
                                        LIMPAR
                                    </button>
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <div>
                <div id='mensagem'>
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            <div className='centraliza'>
                                {successMessage}
                            </div>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            <div className='centraliza'>
                                {errorMessage}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default InscreverCandidato;
