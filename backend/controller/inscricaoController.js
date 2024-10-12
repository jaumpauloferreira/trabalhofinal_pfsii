const Inscricao = require("../model/entidades/inscricao");

const inscricao = new Inscricao();

class MatriculaController {

    async getAll(req, res) {
        res.type('application/json');
        let termo = req.params.termo;
        if (!termo) {
            termo = "";
        }
        if (req.method === "GET") {
            const inscricao = new Inscricao();
            inscricao.getAll(termo).then((listaInscricoes) => {
                res.json({
                    status: true,
                    listaInscricoes: listaInscricoes
                });
            })
            .catch((erro) => {
                res.json({
                    status: false,
                    mensagem: "Não foi possível obter os inscrições: " + erro.message
                });
            });
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar inscrições!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await inscricao.filtrar(filtro);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error during filtering:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async create(req, res) {
        const inscricaoData = req.body;
        try {
            await inscricao.create(inscricaoData)
            res.status(200).json({
                "status": true,
                "mensagem": "Candidato inscrito com sucesso!"
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Inscrição não realizada: você já se candidatou a esta vaga."
                });
            } else {
                console.log("Erro ao matricular aluno", error);
                res.status(500).json({ 
                    "status": false,
                    "mensagem": "Erro ao matricular aluno" 
                });
            }
        }
    }

    async update(req, res) {
        const codigo = req.params.codigo;
        const inscricaoData = req.body;
        try {
            await inscricao.update(codigo, inscricaoData)
            res.status(200).json({ message: "Inscrição atualizada com sucesso" })
        } catch (error) {
            console.log("Erro ao atualizar Inscrição" + error)
            res.status(500).json({ error: "Erro ao atualizar Inscrição" })
        }
    }

    async deleteInscricao(req, res) {
        const cpf = req.params.cpf;
        try {
            await inscricao.deleteInscricao(cpf);
            res.status(200).json({ message: 'Inscrição deletada com sucesso!' })
        } catch (error) {
            console.log('Erro ao deletar Inscrição', error)
            res.status(500).json({ error: 'Erro ao deletar Inscrição' })
        }
    }
}

module.exports = MatriculaController;

