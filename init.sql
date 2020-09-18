CREATE TABLE professors ( ID SERIAL PRIMARY KEY, name VARCHAR(30), title VARCHAR(30), school VARCHAR(30), department VARCHAR(30));

INSERT INTO professors (name, title, school, department) VALUES ('Robert Smith', 'Associate Professor', 'Pennsylvania State University', 'Psychology');

CREATE TABLE reviews (ID SERIAL PRIMARY KEY, professor_id INT, rating INT, text VARCHAR(500));

INSERT INTO reviews (professor_id, rating, text) VALUES (1, 5.0, 'Great professor, really funny, would recommend to anyone that wants an easy A');