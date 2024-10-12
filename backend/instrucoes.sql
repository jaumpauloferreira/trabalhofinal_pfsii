
CREATE TABLE candidato (
    cpf varchar(14) not null primary key,
    nome varchar(100) null,
    endereco varchar(100) null,
    telefone varchar(20) null
);

CREATE TABLE vaga (
    codigo INT NOT NULL AUTO_INCREMENT,
    cargo VARCHAR(100) NOT NULL,
    salario VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    quantidade VARCHAR(100) NOT NULL,
    CONSTRAINT pk_vaga PRIMARY KEY(codigo)
);

CREATE TABLE inscricao (
    cand_cpf VARCHAR(14),
    vaga_codigo INT,
    data_inscricao VARCHAR(100),
    PRIMARY KEY (cand_cpf, vaga_codigo),
    CONSTRAINT FOREIGN KEY (cand_cpf) REFERENCES candidato(cpf),
    CONSTRAINT FOREIGN KEY (vaga_codigo) REFERENCES vaga(Codigo)
);

______________________________________________________________________________________________


INSERT INTO candidato (cpf, nome, endereco, telefone) VALUES
('111.111.111-11', 'João Paulo', 'Rua A, 123', '(11) 99999-1111'),
('222.222.222-22', 'Ana Clara', 'Rua B, 456', '(11) 99999-2222'),
('333.333.333-33', 'Taisa Mariana', 'Rua C, 789', '(11) 99999-3333');


INSERT INTO vaga (cargo, salario, cidade, quantidade) VALUES
('Desenvolvedor de Software', '5000', 'São Paulo', '1'),
('Programador FullStack', '6000', 'Rio de Janeiro', '2'),
('Analista de Sistemas', '5500', 'Belo Horizonte', '3');

INSERT INTO inscricao (cand_cpf, vaga_codigo, data_inscricao) VALUES
('111.111.111-11', 1, '2024-10-06'),
('222.222.222-22', 2, '2024-10-07'),
('333.333.333-33', 3, '2024-10-08');
