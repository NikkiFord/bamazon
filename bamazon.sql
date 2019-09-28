DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pig Feed", "Animal Nutrition", 25, 20), ("Hoof Trimmers", "Animal Care", 9.99, 30), 
("Tarp", "Animal Enrichment", 9.99, 75), ( "Harness", "Outdoor Fun", 29.99, 15), 
("Leash", "Outdoor Fun", 10.99, 20), ("Puzzle Toy", "Animal Enrichment", 15.99, 25), 
("Popcorn", "Animal Nutrition", 5.99, 50), ("Pocket Bed", "Animal Care", 69.99, 15),
("Step Stool", "Utilities", 24.99, 25), ("Shampoo", "Animal Care", 6.99, 50);