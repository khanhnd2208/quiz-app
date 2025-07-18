-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create units table (lessons within classes)
CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    content TEXT,
    order_index INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (test_id) REFERENCES tests(id)
);

-- Create user_test_results table
CREATE TABLE IF NOT EXISTS user_test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    test_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (test_id) REFERENCES tests(id)
);

-- Insert sample data for development
INSERT OR IGNORE INTO classes (id, name, description) VALUES 
(1, 'JavaScript Basics', 'Learn the fundamentals of JavaScript programming'),
(2, 'Web Development', 'HTML, CSS, and JavaScript for building websites'),
(3, 'Database Design', 'Learn how to design and work with databases');

INSERT OR IGNORE INTO units (id, class_id, name, content, order_index) VALUES 
(1, 1, 'Variables and Data Types', 'Learn about variables, strings, numbers, and booleans in JavaScript.', 1),
(2, 1, 'Functions', 'Understand how to create and use functions in JavaScript.', 2),
(3, 2, 'HTML Structure', 'Learn the basic structure of HTML documents.', 1),
(4, 2, 'CSS Styling', 'Discover how to style web pages with CSS.', 2),
(5, 3, 'Database Fundamentals', 'Introduction to databases and SQL.', 1);

INSERT OR IGNORE INTO tests (id, unit_id, name) VALUES 
(1, 1, 'Variables Quiz'),
(2, 2, 'Functions Quiz'),
(3, 3, 'HTML Quiz'),
(4, 4, 'CSS Quiz'),
(5, 5, 'Database Quiz');

INSERT OR IGNORE INTO questions (test_id, question_text, correct_answer, option_a, option_b, option_c, option_d, order_index) VALUES 
(1, 'Which keyword is used to declare a variable in JavaScript?', 'let', 'var', 'let', 'const', 'variable', 1),
(1, 'What data type is "Hello World"?', 'string', 'number', 'string', 'boolean', 'object', 2),
(2, 'How do you call a function named "myFunction"?', 'myFunction()', 'call myFunction', 'myFunction()', 'run myFunction', 'execute myFunction', 1),
(3, 'Which tag is used for the largest heading?', 'h1', 'h1', 'h6', 'header', 'title', 1),
(4, 'Which property changes text color in CSS?', 'color', 'text-color', 'color', 'font-color', 'text-style', 1);
