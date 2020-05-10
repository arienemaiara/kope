import api from './api';

export function detalhe() {
    return api.get('/estabelecimentos/detalhe');
}

export function cadastrar(formData) {
    return api.post('/estabelecimentos', formData);
}

export function atualizar(formData) {
    return api.put('/estabelecimentos', formData);
}