import api from './api';

export function autenticar(userType, email, password) {

	const url = userType === 'cliente' ? '/clientes/login' : '/estabelecimentos/login';

	return api.post(url, {
		email,
		password
	});
}