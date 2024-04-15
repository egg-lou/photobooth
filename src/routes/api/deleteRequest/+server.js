import { PUBLIC_PHOTOBOOTH_URL } from '$env/static/public';

export async function POST({ request, fetch, cookies }) {
	const requestId = await request.json();
	const token = cookies.get('token');
	const response = await fetch(`${PUBLIC_PHOTOBOOTH_URL}/delete_request`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		},
		body: JSON.stringify(requestId)
	});

	console.log('Admin Delete Request...', requestId)

	return response;
}
