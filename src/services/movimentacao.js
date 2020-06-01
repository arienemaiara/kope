import api from './api';

export function criarMovimentacao(formData) {
    return api.post('/movimentacoes', formData);
}