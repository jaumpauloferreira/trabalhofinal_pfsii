const Database = require("../database");

const banco = new Database();
class Inscricao {
    cand_cpf;
    vaga_codigo;
    data_inscricao;
    constructor(cand_cpf, vaga_codigo, data_inscricao) {
        this.cand_cpf = cand_cpf;
        this.vaga_codigo = vaga_codigo;
        this.data_inscricao = data_inscricao;
    }

    async getAll() {
        const inscricoes = await banco.ExecutaComando('SELECT * FROM inscricao');
        return inscricoes;
    }

    // Função para filtrar por CPF ou Nome
    async filtrar({ cpf, nome }) {
        try {
            let sql = `SELECT * FROM inscricao INNER JOIN candidato ON inscricao.cand_cpf = candidato.cpf`;
            let params = [];

            if (cpf) {
                sql += ` WHERE inscricao.cand_cpf = ?`;
                params.push(cpf);
            } else if (nome) {
                sql += ` WHERE candidato.nome LIKE ?`;
                params.push(`%${nome}%`); 
            }

            const result = await banco.ExecutaComando(sql, params);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(dadosInscricao) {
        await banco.ExecutaComandoNonQuery('INSERT INTO inscricao SET ?', dadosInscricao);
    }

    async update(cpf, dadosInscricao) {
        await banco.ExecutaComandoNonQuery('UPDATE inscricao SET ? WHERE cand_cpf = ?', [dadosInscricao, cpf]);
    }

    async deleteInscricao(cpf) {
        await banco.ExecutaComandoNonQuery('DELETE FROM inscricao WHERE cand_cpf = ?', [cpf]);
    }
}

module.exports = Inscricao;


