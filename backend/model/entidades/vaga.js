const Database = require("../database");

const banco = new Database
class Vaga {
    codigo;
    cargo;
    salario;
    cidade;
    quantidade;
    constructor(codigo,cargo,salario,cidade,quantidade) {
        this.codigo = codigo;
        this.cargo = cargo;
        this.salario = salario;
        this.cidade = cidade;
        this.quantidade = quantidade;
    }

    async getAll() {
        const vagas = await banco.ExecutaComando('SELECT * FROM vaga')
        return vagas;
    }

    async filtrar({ cargo }) {
        try {
            const sql = `SELECT * FROM vaga WHERE cargo LIKE '%${cargo}%'`;

            // Assuming ExecutaComando accepts parameters and returns a promise
            let vagas = await banco.ExecutaComando(sql);

            return vagas;
        } catch (error) {
            console.error(error);
            throw error; // Optionally rethrow the error for the calling code to handle
        }
    }

    async create(dadosVaga) {
        await banco.ExecutaComandoNonQuery('insert into vaga set ?', dadosVaga)
    }

    async update(codigo, dadosVaga) {
        const sql = 'UPDATE vaga SET cargo = ?, salario = ?, cidade = ?, quantidade = ? WHERE codigo = ?';
        const params = [dadosVaga.cargo, dadosVaga.salario, dadosVaga.cidade, dadosVaga.quantidade, codigo];
    
        await banco.ExecutaComandoNonQuery(sql, params);
    }
    
    async getByCodigo(codigo) {
        const result = await banco.ExecutaComando('SELECT * FROM vaga WHERE codigo = ?', [codigo]);
        const vaga = result[0];
        return vaga;
    }

    async deleteVaga(codigo) {
        await banco.ExecutaComandoNonQuery('DELETE FROM vaga WHERE codigo = ?', [codigo])
    }
}

module.exports=Vaga;

