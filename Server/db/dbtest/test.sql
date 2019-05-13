CREATE DATABASE IF NOT EXISTS itpdp;

USE itpdp;

CREATE TABLE IF NOT EXISTS Words(
	word_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    class_id INTEGER REFERENCES Class(class_id),
    word VARCHAR(20) NOT NULL,
    helpword1 VARCHAR(16),
    helpword2 VARCHAR(16),
    helpword3 VARCHAR(16)
);

INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Black', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'White', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Yellow', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Shoe', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Aboriginal', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Kangaroo', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Wave', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Bridge', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Toaster', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Beer', 'helpword1', 'helpword2', 'helpword3');
INSERT INTO Words(class_id, word, helpword1, helpword2, helpword3) VALUES (1, 'Idiot', 'helpword1', 'helpword2', 'helpword3');

CREATE TABLE IF NOT EXISTS Recording (
	recording_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	word VARCHAR(40) REFERENCES Words(word_id),
    path VARCHAR(200)
);