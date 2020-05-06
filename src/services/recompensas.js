import api from './api';

export function buscar(page, estabelecimento_id) {
    return api.get('/recompensas', {
        params: {
            page,
            estabelecimento_id
        }
    })
}

export function cadastrar(formData) {
    return api.post('/recompensas', formData);
}

export function alterar(id, formData) {
    return api.put(`/recompensas/${id}`, formData);
}