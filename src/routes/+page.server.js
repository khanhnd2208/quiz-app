import { redirect } from '@sveltejs/kit';
import { getSessionByToken } from '$lib/db/queries.js';
import { getAllClasses } from '$lib/db/queries.js';
import { isSessionExpired } from '$lib/auth/utils.js';

export async function load({ cookies, platform }) {
    const sessionToken = cookies.get('session');
    
    // If no session token, redirect to login
    if (!sessionToken) {
        throw redirect(302, '/login');
    }

    // Check if database is available
    if (!platform?.env?.DB) {
        throw redirect(302, '/login');
    }
    
    try {
        // Check if session exists and is valid
        const session = await getSessionByToken(platform.env.DB, sessionToken);
        
        if (!session || isSessionExpired(session.expires_at)) {
            // Session is invalid or expired, clear cookie and redirect
            cookies.delete('session', { path: '/' });
            throw redirect(302, '/login');
        }
        
        // Get all classes for the logged-in user
        const classes = await getAllClasses(platform.env.DB);
        
        return {
            user: {
                id: session.user_id,
                email: session.email
            },
            classes: classes
        };
        
    } catch (error) {
        console.error('Homepage load error:', error);
        // If there's any error, redirect to login
        cookies.delete('session', { path: '/' });
        throw redirect(302, '/login');
    }
}
