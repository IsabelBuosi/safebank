-- CRIAÇÃO DO BANCO DE DADOS: safebank

CREATE DATABASE safebank;
USE safebank;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone_oficial VARCHAR(20),
    site_oficial VARCHAR(150)
);


CREATE TABLE tipos_golpe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);


CREATE TABLE denuncias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_golpe_id INT NOT NULL,
    empresa_relacionada_id INT NOT NULL,
    descricao TEXT,
    data_denuncia DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (tipo_golpe_id) REFERENCES tipos_golpe(id),
    FOREIGN KEY (empresa_relacionada_id) REFERENCES empresas(id)
);


-- INSERÇÃO DE DADOS INICIAIS

INSERT INTO usuarios (nome, email, senha) VALUES
('Marcella Bolota', 26, 'celinha@email.com', '123456'),
('Carlos Lima', 34, 'carlos@email.com', 'abcdef');


INSERT INTO empresas (nome, telefone_oficial, site_oficial) VALUES
('Banco do Brasil', '0800-729-0722', 'https://www.bb.com.br'),
('Itaú', '0800-728-0728', 'https://www.itau.com.br'),
('Bradesco', '0800-704-8383', 'https://banco.bradesco'),
('Magazine Luiza', '0800-310-0002', 'https://www.magazineluiza.com.br'),
('Correios', '0800-725-0100', 'https://www.correios.com.br');


INSERT INTO tipos_golpe (nome, descricao) VALUES
('Ligação falsa', 'Falsos atendentes pedem dados pessoais e senhas.'),
('E-mail fraudulento', 'Mensagens com links para roubo de dados.'),
('WhatsApp', 'Contas clonadas e pedidos falsos de dinheiro.'),
('SMS', 'Mensagens com links falsos de segurança.'),
('Aplicativo falso', 'Apps falsos que roubam informações bancárias.');


INSERT INTO denuncias (usuario_id, tipo_golpe_id, empresa_relacionada_id, descricao)
VALUES
(1, 1, 2, 'Recebi ligação se passando pelo Itaú pedindo confirmação de compra.'),
(2, 3, 5, 'Mensagem de WhatsApp fingindo ser dos Correios pedindo pagamento de entrega.'),
(1, 2, 4, 'E-mail falso de promoção da Magazine Luiza com link suspeito.');
