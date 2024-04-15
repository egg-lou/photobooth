import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	await cookies.set('token', '', { path: '/', expires: new Date(0) });

	console.log('Admin Logout...');

	return json({ success: true, message: 'Logged out', staus: 200});
}
