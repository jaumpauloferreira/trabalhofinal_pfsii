const API_BASE_URL = 'http://localhost:4000';

class InscricaoService {

    async filtrar({ cpf, nome }) {
        try {
            const response = await fetch(`${API_BASE_URL}/inscricoes/filtrar`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                // Se o CPF for fornecido, envia o CPF; caso contrário, envia o Nome
                body: JSON.stringify(cpf ? { cpf } : { nome })
            });
            if (!response.ok) {
                throw new Error('Erro ao filtrar');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
    
}

export default InscricaoService;
