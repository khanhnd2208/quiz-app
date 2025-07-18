// Database utility functions

// User operations
export async function createUser(db, email, passwordHash) {
    const result = await db.prepare(
        'INSERT INTO users (email, password_hash) VALUES (?, ?) RETURNING id, email, created_at'
    ).bind(email, passwordHash).first();
    
    return result;
}

export async function getUserByEmail(db, email) {
    const user = await db.prepare(
        'SELECT id, email, password_hash, created_at FROM users WHERE email = ?'
    ).bind(email).first();
    
    return user;
}

export async function getUserById(db, userId) {
    const user = await db.prepare(
        'SELECT id, email, created_at FROM users WHERE id = ?'
    ).bind(userId).first();
    
    return user;
}

// Session operations
export async function createSession(db, userId, sessionToken, expiresAt) {
    const result = await db.prepare(
        'INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (?, ?, ?) RETURNING id'
    ).bind(userId, sessionToken, expiresAt).first();
    
    return result;
}

export async function getSessionByToken(db, sessionToken) {
    const session = await db.prepare(`
        SELECT s.id, s.user_id, s.session_token, s.expires_at, u.email, u.id as user_id
        FROM user_sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.session_token = ?
    `).bind(sessionToken).first();
    
    return session;
}

export async function deleteSession(db, sessionToken) {
    await db.prepare(
        'DELETE FROM user_sessions WHERE session_token = ?'
    ).bind(sessionToken).run();
}

// Class operations
export async function getAllClasses(db) {
    const classes = await db.prepare(
        'SELECT id, name, description, created_at FROM classes ORDER BY name'
    ).all();
    
    return classes.results || [];
}

export async function getClassById(db, classId) {
    const classData = await db.prepare(
        'SELECT id, name, description, created_at FROM classes WHERE id = ?'
    ).bind(classId).first();
    
    return classData;
}

// Unit operations
export async function getUnitsByClassId(db, classId) {
    const units = await db.prepare(
        'SELECT id, name, content, created_at FROM units WHERE class_id = ? ORDER BY name'
    ).bind(classId).all();
    
    return units.results || [];
}

export async function getUnitById(db, unitId) {
    const unit = await db.prepare(
        'SELECT id, class_id, name, content, created_at FROM units WHERE id = ?'
    ).bind(unitId).first();
    
    return unit;
}

// Question operations
export async function getQuestionsByUnitId(db, unitId) {
    const questions = await db.prepare(
        'SELECT id, question_text, correct_answer, option_a, option_b, option_c, option_d FROM questions WHERE unit_id = ?'
    ).bind(unitId).all();
    
    return questions.results || [];
}
