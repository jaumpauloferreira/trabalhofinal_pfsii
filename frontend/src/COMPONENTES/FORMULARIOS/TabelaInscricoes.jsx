import "./TabelaInscricoes.css";
import InscricaoService from '../../SERVICES/inscricoesService.js';
import { useState, useEffect, useCallback } from 'react';
import InscreverCandidato from "./InscreverCandidato.jsx";

const inscricaoService = new InscricaoService();

function TabelaInscricoes({ isMenuExpanded }) {
  const [inscricoes, setInscricoes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('cpf'); // Estado para o tipo de pesquisa (CPF ou Nome)
  const [error, setError] = useState(null);
  const [candidatos, setCandidatos] = useState([{
    cpf: 0,
    nome: "Nenhum candidato encontrado"
  }]);
  const [vagas, setVagas] = useState([{
    codigo: 0,
    cargo: "Nenhuma vaga encontrada"
  }]);

  const handleSetError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const buscarCandidatos = useCallback(() => {
    fetchWithErrorHandling('http://localhost:4000/candidatos')
      .then(data => setCandidatos(data.listaCandidatos || []))
      .catch(error => handleSetError("Erro ao recuperar candidatos: " + error.message));
  }, []);

  const buscarVagas = useCallback(() => {
    fetchWithErrorHandling('http://localhost:4000/vagas')
      .then(data => setVagas(data.listaVagas || []))
      .catch(error => handleSetError("Erro ao recuperar vagas: " + error.message));
  }, []);

  const buscarInscricoes = useCallback(() => {
    fetchWithErrorHandling('http://localhost:4000/inscricoes')
      .then(data => setInscricoes(data.listaInscricoes || []))
      .catch(error => handleSetError("Erro ao recuperar inscrições: " + error.message));
  }, []);

  useEffect(() => {
    buscarCandidatos();
    buscarVagas();
    buscarInscricoes();
  }, [buscarCandidatos, buscarVagas, buscarInscricoes]);

  const fetchWithErrorHandling = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch");
      return data;
    } catch (error) {
      console.error("Fetch error:", error.message);
      throw error;
    }
  };

  const handleRestaurarTabela = () => {
    setSearchInput(''); // Limpar o campo de pesquisa
    buscarInscricoes(); // Recarregar todas as inscrições
  };

  // Função para buscar por CPF ou Nome com base na seleção
  const handleFiltrar = async () => {
    try {
      setInscricoes([]); // Limpa as inscrições antes de uma nova busca

      if (!searchInput) {
        buscarInscricoes();
        return;
      }

      let matriculasFiltradas;

      if (searchType === 'cpf') {
        matriculasFiltradas = await inscricaoService.filtrar({ cpf: searchInput });
      } else if (searchType === 'nome') {
        matriculasFiltradas = await inscricaoService.filtrar({ nome: searchInput });
      }

      if (matriculasFiltradas.length === 0) {
        handleSetError('Candidato não encontrado. Verifique o CPF ou nome e tente novamente.');
      } else {
        setInscricoes(matriculasFiltradas);
      }
    } catch (error) {
      console.error('Erro ao filtrar matrículas:', error);
      handleSetError('Erro ao filtrar matrículas. Tente novamente mais tarde.');
    }
  };

  return (
    <div id="formularioCandidato" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
          <InscreverCandidato onNewInscricao={buscarInscricoes} />
          <div id='mensagem'>
            {error && (
              <div className="alert alert-danger ml-4" role="alert">{error}</div>
            )}
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group borda-form mt-5">
                <label htmlFor="pesquisar">
                  <i className="bi bi-search"></i> Pesquisar:
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={searchType === 'cpf' ? "Informe o CPF do candidato" : "Informe o Nome do candidato"}
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                  />
                  <select
                    id="tipoPesquisa"
                    className="form-select"
                    style={{ maxWidth: '150px' }}
                    value={searchType}
                    onChange={(event) => setSearchType(event.target.value)}
                  >
                    <option value="cpf">CPF</option>
                    <option value="nome">Nome</option>
                  </select>
                </div>
              </div>
            </div>
            <div id='pesquisar'>
              <button
                className="btn btn-primary btn-gradient"
                id="pesquisar"
                type="button"
                onClick={handleFiltrar}
              >
                Pesquisar
              </button>
            </div>
            <div id='restaurar'>
              <button
                className="btn btn-primary btn-gradient"
                id="restaurar"
                type="restaurar"
                onClick={handleRestaurarTabela}
              >
                Restaurar Tabela
              </button>
            </div>
          </div>
          {inscricoes.length === 0 ? (
            <div className="alert alert-danger ml-4 text-center mx-auto" role="alert">
              ERRO: Não foi possível buscar a lista de inscritos no backend!
            </div>
          ) : (
            <table className="table table-striped table-hover table-bordered">
              <thead className="azul">
                <tr>
                  <th scope="col">CPF</th>
                  <th scope="col">Candidato</th>
                  <th scope="col">Vaga</th>
                  <th scope="col">Salário</th>
                  <th scope="col">Data da inscrição</th>
                </tr>
              </thead>
              <tbody>
                {inscricoes.map(inscricao => (
                  <tr key={inscricao.cand_cpf}>
                    <td className="texto">{inscricao.cand_cpf}</td>
                    <td className="texto">{candidatos.find(c => c.cpf === inscricao.cand_cpf)?.nome || 'Desconhecido'}</td>
                    <td className="texto">{vagas.find(v => v.codigo === inscricao.vaga_codigo)?.cargo || 'Desconhecido'}</td>
                    <td className="texto">R$ {vagas.find(v => v.codigo === inscricao.vaga_codigo)?.salario || 'Desconhecido'}</td>
                    <td className="texto">{inscricao.data_inscricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TabelaInscricoes;

