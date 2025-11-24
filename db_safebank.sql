-- =========================================
-- BANCO DE DADOS DO SAFE BANK
-- Baseado em todas as funcionalidades do front-end
-- =========================================
CREATE DATABASE IF NOT EXISTS safebank;
USE safebank;
-- =========================================
-- TABELA DE USUÁRIOS
-- =========================================
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(120) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
idade INT NOT NULL,
avatar TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- =========================================
-- TABELA DE RELATOS (POSTS)
-- =========================================
CREATE TABLE reports (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
created_at DATETIME NOT NULL,
address VARCHAR(255),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- =========================================
-- TABELA PARA IMAGENS DOS RELATOS
-- =========================================
CREATE TABLE report_images (
id INT AUTO_INCREMENT PRIMARY KEY,
report_id INT NOT NULL,
image_url TEXT NOT NULL,
FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);
-- =========================================
-- CURTIDAS (LIKES)
-- =========================================
CREATE TABLE likes (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
report_id INT NOT NULL,
liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE (user_id, report_id),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);
-- =========================================
-- COMENTÁRIOS
-- =========================================
CREATE TABLE comments (
id INT AUTO_INCREMENT PRIMARY KEY,
report_id INT NOT NULL,
user_id INT NOT NULL,
text TEXT NOT NULL,
created_at DATETIME NOT NULL,
FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);