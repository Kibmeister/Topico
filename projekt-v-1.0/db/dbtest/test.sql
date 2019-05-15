CREATE DATABASE IF NOT EXISTS itpdp;

USE itpdp;

CREATE TABLE IF NOT EXISTS Words(
	word VARCHAR(16) PRIMARY KEY,
    queword1 VARCHAR(16),
    queword2 VARCHAR(16),
    queword3 VARCHAR(16)
);

INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Black', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('White', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Yellow', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Shoe', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Aboriginal', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Kangaroo', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Wave', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Bridge', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Toaster', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Beer', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(word, helpword1, helpword2, helpword3) VALUES ('Idiot', 'helpword1', 'helpword2', 'helpword3');

CREATE TABLE IF NOT EXISTS Recording (
	recording_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	word VARCHAR(40) REFERENCES Words(word_id),
    path VARCHAR(200)
);