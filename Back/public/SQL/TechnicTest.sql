CREATE DATABASE IF NOT EXISTS TechnicTest;
USE TechnicTest;

SET FOREIGN_KEY_CHECKS=0;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE IF NOT EXISTS articles (
	`article_id` INT NOT NULL,
    `nombre` varchar(100) NOT NULL,
    `relevancia` varchar(100) NOT NULL,
    `precio` DECIMAL,
    PRIMARY KEY(article_id)
    
);

CREATE TABLE IF NOT EXISTS suppliers (
	`supplier_id` INT NOT NULL ,
    `nombre` varchar(100) NOT NULL,
    `cif` varchar(100) NOT NULL,
    `direccion` varchar(100) NOT NULL,
    PRIMARY KEY(supplier_id)
    
);

CREATE TABLE IF NOT EXISTS ArticleSupplier(
	`idArticleSupplier` INT NOT NULL AUTO_INCREMENT,
    `ext_articleId` INT NOT NULL,
    `ref_idSupplier` INT NOT NULL,
    PRIMARY KEY(idArticleSupplier),
    FOREIGN KEY(`ext_articleId`)
        REFERENCES articles(`article_id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(`ref_idSupplier`)
        REFERENCES suppliers(`supplier_id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

ALTER TABLE ArticleSupplier ADD FOREIGN KEY (`ext_articleId`) REFERENCES articles(article_id);
﻿