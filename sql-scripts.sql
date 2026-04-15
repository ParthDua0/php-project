CREATE DATABASE event_db;
USE event_db;

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(255)
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    event_date DATETIME,
    location VARCHAR(255),
    total_seats INT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (username, password)
VALUES ('admin', '$2y$10$.Mun0GXqLJLCF/j787lKE.t.sJJvBJ.W1EmJnYKKzMZH3yCW3s6Oe');