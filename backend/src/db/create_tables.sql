CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS boards (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS columns (
    id SERIAL PRIMARY KEY,
    boardId INT NOT NULL,
    userId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT fk_board FOREIGN KEY(boardId) REFERENCES boards(id),
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    columnId INT NOT NULL,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(8092),
    CONSTRAINT fk_column FOREIGN KEY(columnId) REFERENCES columns(id),
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS subtasks (
    id SERIAL PRIMARY KEY,
    taskId INT NOT NULL,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    isCompleted BOOLEAN NOT NULL DEFAULT false,
    description VARCHAR(8092),
    CONSTRAINT fk_task FOREIGN KEY(taskId) REFERENCES tasks(id),
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(id)
);