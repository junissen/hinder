DROP DATABASE IF EXISTS hinder_DB;

CREATE DATABASE hinder_DB;

USE hinder_DB;

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(40),
	password VARCHAR(40),
	photo VARCHAR(255),
	phone_number VARCHAR(15),
	phone_carrier VARCHAR(30),
	group_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (group_id) REFERENCES group(id)
);

CREATE TABLE group (
	id INT NOT NULL AUTO_INCREMENT,
	group_name VARCHAR(40),
	category_id INT,
	bio VARCHAR(255),
	photo VARCHAR(255),
	PRIMARY KEY (id),
	FOREIGN KEY (category_id) REFERENCES group_category(id)
);

CREATE TABLE group_category (
	id INT NOT NULL AUTO_INCREMENT,
	category_name VARCHAR (40),
	description VARCHAR (255),
	PRIMARY KEY (id)
);

CREATE TABLE prank (
	id INT NOT NULL AUTO_INCREMENT,
	prank_name VARCHAR(40),
	prank_complete BOOLEAN DEFAULT FALSE,
	pranker_id INT,
	target_id INT,
	prank_type VARCHAR(40),
	thumbs_up INT(9) DEFAULT 0,
	thumbs_down INT(9) DEFAULT 0,
	group_id INT,
	-- COMMENTS
	PRIMARY KEY (id),
	FOREIGN KEY (pranker_id) REFERENCES user(id),
	FOREIGN KEY (target_id) REFERENCES user(id),
	FOREIGN KEY (prank_type) REFERENCES prank_category(id),
	FOREIGN KEY (group_id) REFERENCES group(id)
);

CREATE TABLE prank_category (
	id INT NOT NULL AUTO_INCREMENT,
	prank_type VARCHAR(40),
	asset VARCHAR (255),
	PRIMARY KEY (id)
);










