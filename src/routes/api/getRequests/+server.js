import { PUBLIC_PHOTOBOOTH_URL } from '$env/static/public';

export async function GET({ fetch, cookies }) {
	const token = cookies.get('token');
	const response = await fetch(`${PUBLIC_PHOTOBOOTH_URL}/get_requests`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		}
	});
	return response;
}
