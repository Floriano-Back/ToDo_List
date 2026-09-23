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
    }
}

export default controller;