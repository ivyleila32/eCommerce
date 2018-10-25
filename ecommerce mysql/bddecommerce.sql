CREATE DATABASE IF NOT EXISTS `ecommerce`;

USE `ecommerce`;

CREATE TABLE IF NOT EXISTS `users` (
 `id` int(10) NOT NULL AUTO_INCREMENT,
 `username` varchar(30) DEFAULT NULL,
 `password` varchar(40) DEFAULT NULL,
 `wishlist` int(10) DEFAULT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `products` (
 `id` int(10) NOT NULL AUTO_INCREMENT,
 `price` float(7, 2) DEFAULT NULL,
 `last_price` float(7, 2) DEFAULT NULL,
 `stock` int(10) DEFAULT NULL,
 `category` varchar(40) DEFAULT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `purchases` (
 `id` int(10) NOT NULL AUTO_INCREMENT,
 `user` int(10) DEFAULT NULL,
 `product` int(10) DEFAULT NULL,
 `date` date DEFAULT NULL,
 `total` float(20, 2) DEFAULT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `wishlists` (
 `id_user` int(10) NOT NULL,
 `id_product` int(10) NOT NULL,

 PRIMARY KEY(`id_user`, `id_product`)
);

CREATE TABLE IF NOT EXISTS `categories` (
 `id_category` int(10) NOT NULL,
 `type_category` varchar(30) DEFAULT NULL,

 PRIMARY KEY(`id_category`)
);

CREATE TABLE IF NOT EXISTS `categories_for_products` (
 `id_category` int(10) NOT NULL,
 `id_product` int(10) NOT NULL,

 PRIMARY KEY(`id_category`, `id_product`)
);

CREATE TABLE IF NOT EXISTS `products_for_purchases` (
 `id_product` int(10) NOT NULL,
 `id_purchases` int(10) NOT NULL,
 `qty` int(10) DEFAULT NULL,

 PRIMARY KEY(`id_product`, `id_purchases`)
);
-- Los nombre de las restricciones son unicos para toda la Base de Datos
ALTER TABLE `products_for_purchases` 
ADD CONSTRAINT `fk1` FOREIGN KEY (`id_purchases`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT `fk2` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `categories_for_products` 
ADD CONSTRAINT `fk3` FOREIGN KEY (`id_category`) REFERENCES `categories`(`id_category`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT `fk4` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `wishlists` 
ADD CONSTRAINT `fk5` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT `fk6fk4` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;