create table if not exists user (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    creatAt DATETIME NULL DEFAULT now(),
    PRIMARY KEY (id)
);

select * from user;

CREATE TABLE IF NOT EXISTS board (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1024) NOT NULL,
    cnt INT NULL DEFAULT 0,
    createdAt DATETIME NULL DEFAULT now(),
    PRIMARY KEY (id)
);

INSERT INTO board (name, title, content) VALUES ('홍길동', '첫번째 게시물', '첫번째 게시물 내용입니다...');
INSERT INTO board (name, title, content) VALUES ('둘리', '두번째 게시물', '두번째 게시물 내용입니다...');
INSERT INTO board (name, title, content) VALUES ('또치', '세번째 게시물', '세번째 게시물 내용입니다...');
INSERT INTO board (name, title, content) VALUES ('고길동', '네번째 게시물', '네번째 게시물 내용입니다...');

select * from board ORDER BY id DESC;