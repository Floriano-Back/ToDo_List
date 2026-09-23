import repository from '../Repository/Repository.js';

const service = {
    createList: async (description, status) =>{
        const result = await repository.create(description, status);
        return result;
    },
    updateList: async (description, status,id) =>{
        const result = await repository.update(description, status,id);
        return result;
    },
    deleteList: async (id) =>{
        const result = await repository.delete(id);
        return result;
    },
    showListAll: async () =>{
        const result = await repository.list();
        return result;
    },
    showListStatus: async (status) =>{
        const result = await repository.listStatus(status);
        return result;
    },
    showListId: async (id) =>{
        const result = await repository.listId(id);
        return result;
    }
}

export default service;
