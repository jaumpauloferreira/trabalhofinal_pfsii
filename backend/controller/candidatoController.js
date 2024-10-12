const Candidato = require("../model/entidades/candidato");

const candidato = new Candidato()

class CandidatoController {

    async getAll(req, res) {
        res.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = req.params.termo;
        if (!termo){
            termo = "";
        }
        if (req.method === "GET"){
            const candidato = new Candidato();
            candidato.getAll(termo).then((listaCandidatos)=>{
                res.json(
                    {
                        status:true,
                        listaCandidatos: listaCandidatos
                    });
            })
            .catch((erro)=>{
                res.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os candidatos: " + erro.message
                    }
                );
            });
        }
        else 
        {
            res.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar candidatos!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
          const result = await candidato.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          console.error('Error during filtering:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
          const result = await candidato.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          console.error('Error during filtering:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      
    async getByCPF(req,res) {
        const cpf = req.params.cpf;
        try {
            const result = await candidato.getByCPF(cpf)
            if(result){
                return res.status(200).json(result)
            }else{
                res.status(404).json({error:'Aluno não encontrado'})
            }
        } catch (error) {
            console.log("Erro ao buscar alunos"+error)
            res.status(500).json({error:"Erro ao buscar alunos"})
        }

    }

    async create(req,res){
        const candidatoData = req.body;
        try{
            await candidato.create(candidatoData)
            res.status(200).json({mensagem:"Candidato cadastrado com sucesso"})
        }catch(error){
            console.log("Erro ao cadastrar candidato "+error+"a")
            res.status(500).json({error: "Erro ao cadastrar candidato"})
        }
    }

    async update(req,res){
        const cpf = req.params.cpf;
        const candidatoData = req.body;
        try{
            await candidato.update(cpf,candidatoData)
            res.status(200).json({mensagem:"Candidato atualizado com sucesso"})
        }catch(error){
            console.log("Erro ao atualizar candidato"+error)
            res.status(500).json({error:"Erro ao atualizar candidato"})
        }
    }

    async deleteCandidato(req,res){
        const cpf = req.params.cpf;
        try{
            await candidato.deleteCandidato(cpf);
            res.status(200).json({mensagem:'Candidato Deletado com sucesso!'})
        }catch(error){
            console.log('Erro ao deletar candidato',error)
            res.status(500).json({error:'Erro ao deletar candidato'})
        }
    }

}

module.exports=CandidatoController