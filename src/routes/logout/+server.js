import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/db/queries.js'; 

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, platform }) {
	const sessionToken = cookies.get('session');

	if (sessionToken && platform?.env?.DB) {
		try {
			// Securely delete the session from the database
			await deleteSession(platform.env.DB, sessionToken);
		} catch (error) {
			console.error('Error deleting session:', error);
		}
	}

	// Clear the session cookie from the browser
	cookies.delete('session', { path: '/' });

	// Redirect to the login page
	throw redirect(303, '/login');
}