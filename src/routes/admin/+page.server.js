import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.authenticated) {
		throw redirect(303, '/login');
	}
};
