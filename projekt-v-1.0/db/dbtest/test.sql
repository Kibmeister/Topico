CREATE DATABASE IF NOT EXISTS itpdp;

USE itpdp;

CREATE TABLE IF NOT EXISTS Words(
	word VARCHAR(16) PRIMARY KEY,
    queword1 VARCHAR(16),
    queword2 VARCHAR(16),
    queword3 VARCHAR(16)
);

INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Black', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('White', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Yellow', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Shoe', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Aboriginal', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Kangaroo', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Wave', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Bridge', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Toaster', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Beer', 'queword1', 'queword2', 'queword3');
INSERT INTO Words(word, queword1, queword2, queword3) VALUES ('Idiot', 'queword1', 'queword2', 'queword3');

CREATE TABLE IF NOT EXISTS Recordings (
	recording_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	word VARCHAR(16) REFERENCES Words(word),
    rpath VARCHAR(200)
);

INSERT INTO Recordings(word, rpath) VALUES ('Bridge', 'Bridgepath');
INSERT INTO Recordings(word, rpath) VALUES ('Bridge', 'Bridgepath2');
INSERT INTO Recordings(word, rpath) VALUES ('Bridge', 'Bridgepath3');