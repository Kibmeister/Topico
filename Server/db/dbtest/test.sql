CREATE DATABASE IF NOT EXISTS itpdp;

USE itpdp;

CREATE TABLE IF NOT EXISTS Class(
	class_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    teacher_name VARCHAR(40) NOT NULL
);

INSERT INTO Class(name, teacher_name) VALUES ('Klasse 1', 'Teacher name');

CREATE TABLE IF NOT EXISTS Teams(
	team_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(30),
    points INTEGER,
    class_id INTEGER REFERENCES Class(class_id)
);

INSERT INTO Teams(team_name, points, class_id) VALUES ('Team 1', 20, 1);
INSERT INTO Teams(team_name, points, class_id) VALUES ('Team 2', 10, 1);
INSERT INTO Teams(team_name, points, class_id) VALUES ('Team 3', 15, 1);
INSERT INTO Teams(team_name, points, class_id) VALUES ('Team 4', 2, 1);

CREATE TABLE IF NOT EXISTS Words(
	word_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    class_id INTEGER REFERENCES Class(class_id),
    word VARCHAR(20) NOT NULL
);

INSERT INTO Words(class_id, word) VALUES (1, 'Black');
INSERT INTO Words(class_id, word) VALUES (1, 'White');
INSERT INTO Words(class_id, word) VALUES (1, 'Yellow');
INSERT INTO Words(class_id, word) VALUES (1, 'Shoe');
INSERT INTO Words(class_id, word) VALUES (1, 'Aboriginal');
INSERT INTO Words(class_id, word) VALUES (1, 'Kangaroo');
INSERT INTO Words(class_id, word) VALUES (1, 'Wave');
INSERT INTO Words(class_id, word) VALUES (1, 'Bridge');
INSERT INTO Words(class_id, word) VALUES (1, 'Toaster');
INSERT INTO Words(class_id, word) VALUES (1, 'Beer');
INSERT INTO Words(class_id, word) VALUES (1, 'Idiot');

CREATE TABLE IF NOT EXISTS Recording (
	recording_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	word VARCHAR(40) REFERENCES Words(word_id),
    path VARCHAR(200)
);