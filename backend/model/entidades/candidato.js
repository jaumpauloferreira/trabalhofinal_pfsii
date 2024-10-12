const Database = require("../database");

const banco = new Database

class Candidato {
    cpf;
    nome;
    endereco;
    telefone;
    constructor(cpf, nome, endereco, telefone) {
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    async getAll() {
        const candidatos = await banco.ExecutaComando('SELECT * FROM candidato')
        return candidatos;
    }

    async filtrar({ nome }) {
        let sql = "SELECT * FROM candidato WHERE nome LIKE ?";
        const params = [`%${nome}%`];

        const candidatos = await banco.ExecutaComando(sql, params);
        return candidatos;
    }


    async create(dadosCandidato) {
        await banco.ExecutaComandoNonQuery('insert into candidato set ?', dadosCandidato)
    }

    async update(cpf, dadosCandidato) {
        await banco.ExecutaComandoNonQuery('update candidato set ? where cpf = ?', [dadosCandidato, cpf])
    }

    async getByCPF(cpf) {
        const result = await banco.ExecutaComando('SELECT * FROM candidato WHERE cpf = ?', [cpf]);
        const candidato = result[0];
        return candidato;
    }

    async deleteCandidato(cpf) {
        await banco.ExecutaComandoNonQuery('DELETE FROM candidato WHERE cpf = ?', [cpf])
    }

}
module.exports = Candidato