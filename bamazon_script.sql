CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE products (
	item_id INTEGER(11) auto_increment NOT NULL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(50) NOT NULL, 
    retail DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    wholesale DECIMAL(10,2) NOT NULL
    );

SELECT * FROM  products
SELECT * FROM sales

CREATE TABLE sales (
	order_id INTEGER(11) auto_increment NOT NULL PRIMARY KEY,
    item_id INTEGER(11) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(50) NOT NULL, 
    order_quantity INTEGER(11) NOT NULL,
    total DECIMAL(10,2) NOT NULL
    );


CREATE TABLE wholesale (
	wholesale_id INTEGER(11) auto_increment NOT NULL PRIMARY KEY,
    item_id INTEGER(11) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    wholesale_quantity INTEGER(11) NOT NULL,
    wholesale_total DECIMAL(10,2) NOT NULL
    );
 SELECT LAST_INSERT_ID();
