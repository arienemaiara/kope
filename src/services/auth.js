import api from './api';

export function autenticar(userType, user, password) {

	if (userType === 'cliente') {
		return api.post('/clientes/login', {
			cpf: user,
			password
		});
	}
	else {
		return api.post('/estabelecimentos/login', {
			cpf_cnpj: user,
			password
		});
	}
}