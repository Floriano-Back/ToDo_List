CREATE DATABASE tasks;

USE tasks;

CREATE TABLE activity(
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    status ENUM("Finalizado", "Em Andamento", "Interrompido") DEFAULT ("Em Andamento"),
    UNIQUE (description(400))
)
