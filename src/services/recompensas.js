import api from './api';

export function cadastrar(formData) {
    return api.post('/recompensas', formData);
}

export function alterar(id, formData) {
    return api.put(`/recompensas/${id}`, formData);
}