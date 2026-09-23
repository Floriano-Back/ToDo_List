import service from '../Service/service.js';

const controller = {
    create: async (req, res) =>{
        try{
        const {description, status} = req.body;

        const result = await service.createList(description, status);
        return res.status(200).json({msg: "Criado!"});

        }catch(error){
            console.error(error);
            res.status(400).json({msg: "Falha interna ao criar a lista"});
        }
    },
    showAll: async (req,res) =>{
        try{
            const result = await service.showListAll();
            return res.status(200).json({msg: "Todas as atividades feitas:", result});
        }catch(error){
            console.error(error);
            res.status(400).json({msg: 'Falha ao recuperar as atividades'});
        }
    },
    showStatus: async (req, res) =>{
        try{
            const {status} = req.body;

            const result = await service.showListStatus(status);
            return res.status(200).json({msg: "Aqui esta!", result});

        }catch(error){
            console.error(error);
            res.status(400).json({msg: 'Falha ao recuperar as atividades'});
        }
    },
    update: async (req, res) =>{
        try{
            const {id} = req.params;
            const {description, status} = req.body;

            const result = await service.updateList(description, status, id);
            return res.status(200).json({msg: "Atualizado!"});

        }catch(error){
            console.error(error);
            res.status(400).json({msg: 'Falha ao atualizar a atividade'});
        }
    },
    delete: async (req, res) =>{
        try{
            const {id} = req.params;
            const result = await service.deleteList(id);
            return res.status(200).json({msg: "Deletado!"});

        }catch(error){
            console.error(error);
            res.status(400).json({msg: 'Falha ao deletar a atividade'});
        }
    },

}

export default controller;