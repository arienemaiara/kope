import api from './api';

export function cadastrar(formData) {
    return api.post('/clientes', formData);
}

export function atualizar(formData) {
    return api.put('/clientes', formData);
}