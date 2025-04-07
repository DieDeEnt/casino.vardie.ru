

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(255) UNIQUE,
    ip VARCHAR(255), 
    balance FLOAT DEFAULT(0),
    inventory VARCHAR(255),
    caseOpened INT DEFAULT(0),
    loseMoney FLOAT DEFAULT(0)
);