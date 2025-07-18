import { redirect } from '@sveltejs/kit';
import { getSessionByToken, getClassById, getUnitsByClassId } from '$lib/db/queries.js';
import { isSessionExpired } from '$lib/auth/utils.js';

export async function load({ params, cookies, platform }) {
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
        
        // Get class details
        const classData = await getClassById(platform.env.DB, params.id);
        
        if (!classData) {
            throw redirect(302, '/');
        }
        
        // Get units for this class
        const units = await getUnitsByClassId(platform.env.DB, params.id);
        
        return {
            user: {
                id: session.user_id,
                email: session.email
            },
            class: classData,
            units: units
        };
        
    } catch (error) {
        console.error('Class page load error:', error);
        // If there's any error, redirect to homepage
        throw redirect(302, '/');
    }
}
