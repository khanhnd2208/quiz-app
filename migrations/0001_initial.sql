-- Create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create classes table
CREATE TABLE classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create units table
CREATE TABLE units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Create questions table
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

-- Create user_sessions table for authentication
CREATE TABLE user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO classes (name, description) VALUES 
('Mathematics', 'Basic mathematics concepts and problems'),
('Science', 'Introduction to scientific principles'),
('History', 'World history and important events');

INSERT INTO units (class_id, name, content) VALUES 
(1, 'Basic Addition', 'Learn how to add numbers together. Addition is one of the fundamental mathematical operations.'),
(1, 'Basic Subtraction', 'Learn how to subtract numbers. Subtraction is the opposite of addition.'),
(2, 'The Solar System', 'Learn about planets, stars, and other celestial bodies in our solar system.'),
(3, 'Ancient Civilizations', 'Explore the great civilizations of ancient times including Egypt, Rome, and Greece.');

INSERT INTO questions (unit_id, question_text, correct_answer, option_a, option_b, option_c, option_d) VALUES 
(1, 'What is 2 + 3?', 'B', '4', '5', '6', '7'),
(1, 'What is 10 + 15?', 'C', '20', '24', '25', '30'),
(2, 'What is 10 - 4?', 'B', '5', '6', '7', '8'),
(3, 'How many planets are in our solar system?', 'A', '8', '9', '7', '10'),
(4, 'Which civilization built the pyramids?', 'A', 'Egyptian', 'Roman', 'Greek', 'Persian');
