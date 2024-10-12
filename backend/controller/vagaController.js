const Vaga = require("../model/entidades/vaga");

const vaga = new Vaga();

class VagaController {

    async getAll(req, res) {
        res.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = req.params.termo;
        if (!termo){
            termo = "";
        }
        if (req.method === "GET"){
            const vaga = new Vaga();
            vaga.getAll(termo).then((listaVagas)=>{
                res.json(
                    {
                        status:true,
                        listaVagas: listaVagas
                    });
            })
            .catch((erro)=>{
                res.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter as vagas: " + erro.message
                    }
                );
            });
        }
        else 
        {
            res.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar vagas!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
          const result = await vaga.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          return res.status(500).json({ error: 'Erro' });
        }
      }


    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await vaga.getByCodigo(codigo)
            if (result) {
                return res.status(200).json(result)
            } else {
                res.status(404).json({ error: 'Vaga não encontrada' })
            }
        } catch (error) {
            console.log("Erro ao buscar vagas" + error)
            res.status(500).json({ error: "Erro ao buscar vagas" })
        }

    }

    async create(req,res){
        const vagaData = req.body;
        try{
            await vaga.create(vagaData)
            res.status(200).json({
                "status": true,
                "mensagem": "Vaga incluída com sucesso!"
            })
        }catch(error){
            console.log("Erro ao cadastrar vaga "+error+"a")
            res.status(500).json({error: "Erro ao cadastrar vaga"})
        }
    }
    
    async update(req, res) {
        const codigo = req.params.codigo;
        const vagaData = req.body;
        try {
            await vaga.update(codigo, vagaData)
            res.status(200).json({ message: "Vaga atualizada com sucesso" })
        } catch (error) {
            console.log("Erro ao atualizar turma" + error)
            res.status(500).json({ error: "Erro ao atualizar turma" })
        }
    }

    async deleteVaga(req,res){
        const codigo = req.params.codigo;
        try{
            await vaga.deleteVaga(codigo);
            res.status(200).json({message:'Vaga deletada com sucesso!'})
        }catch(error){
            console.log('Erro ao deletar vaga',error)
            res.status(500).json({error:'Erro ao deletar vaga'})
        }
    }

}

module.exports = VagaController;