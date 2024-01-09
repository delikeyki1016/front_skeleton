create table if not exists user (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    creatAt DATETIME NULL DEFAULT now(),
    PRIMARY KEY (id)
);

select * from user;