CREATE DATABASE  IF NOT EXISTS `bamazon_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bamazon_db`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: bamazon_db
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(75) NOT NULL,
  `department_name` varchar(25) NOT NULL,
  `retail` decimal(10,2) NOT NULL,
  `wholesale` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `itemID` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Miles Kimball Knitting Tote Bag',' crafts',7.99,3.50,3),(2,'Rubbermaid Glass Food Storage Containers',' kitchen',23.42,17.00,0),(3,'Thomastik Dominant 16.5\" Viola String Set',' music',95.99,65.00,10),(4,'Treble Clef Pendant',' jewelry',13.99,2.00,20),(5,'D\'Addario Helicore Viola String Set',' music',52.08,10.00,20),(6,'Womens Wonder Woman Stud Earrings',' jewelry',7.49,2.50,7),(7,'Prismacolor Premier Double-Ended Art Markers',' crafts',38.98,3.50,3),(8,'Brush Pen Set - 20 Colors',' crafts',25.99,8.25,9),(9,'20 Skeins Bonbons Yarn Assorted Colors',' crafts',14.99,1.35,2),(10,'Magic Bullet Blender -  11 Piece Set',' kitchen',34.99,6.75,7),(11,'Fairy Tail Heartphilia Cosplay Dress','clothing',99.95,25.00,5),(12,'Totoro 12oz Coffee Mug Set with Lid and Spoon','kitchen',19.99,0.75,5),(13,'Totoro Starry Night Poster','decoration',15.00,0.50,10),(14,'Bowers & Wilkins P7 Wireless Headphones','technology',399.98,75.50,6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `order_quantity` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `itemID` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,7,'Prismacolor Premier Double-Ended Art Markers',1,38.98),(2,4,'Treble Clef Pendant',1,13.99),(3,4,'Treble Clef Pendant',1,13.99),(4,4,'Treble Clef Pendant',1,13.99),(5,8,'Brush Pen Set - 20 Colors',1,25.99),(6,5,'D\'Addario Helicore Viola String Set',1,52.08),(7,8,'Brush Pen Set - 20 Colors',1,25.99),(8,1,'Miles Kimball Knitting Tote Bag',1,7.99),(9,1,'Miles Kimball Knitting Tote Bag',1,7.99),(10,2,'Rubbermaid Glass Food Storage Containers',1,23.42),(11,5,'D\'Addario Helicore Viola String Set',1,52.08),(12,1,'Miles Kimball Knitting Tote Bag',1,7.99),(13,1,'Miles Kimball Knitting Tote Bag',1,7.99),(14,1,'Miles Kimball Knitting Tote Bag',1,7.99),(15,2,'Rubbermaid Glass Food Storage Containers',1,23.42),(16,1,'Miles Kimball Knitting Tote Bag',1,7.99),(17,6,'Womens Wonder Woman Stud Earrings',1,7.49),(18,6,'Womens Wonder Woman Stud Earrings',1,7.49),(19,6,'Womens Wonder Woman Stud Earrings',1,7.49),(20,6,'Womens Wonder Woman Stud Earrings',1,7.49),(21,7,'Prismacolor Premier Double-Ended Art Markers',1,38.98),(22,7,'Prismacolor Premier Double-Ended Art Markers',1,38.98),(23,7,'Prismacolor Premier Double-Ended Art Markers',1,38.98),(24,7,'Prismacolor Premier Double-Ended Art Markers',1,38.98),(25,8,'Brush Pen Set - 20 Colors',1,25.99),(26,8,'Brush Pen Set - 20 Colors',1,25.99),(27,8,'Brush Pen Set - 20 Colors',1,25.99),(28,8,'Brush Pen Set - 20 Colors',1,25.99),(29,8,'Brush Pen Set - 20 Colors',1,25.99),(30,8,'Brush Pen Set - 20 Colors',1,25.99),(31,8,'Brush Pen Set - 20 Colors',1,25.99),(32,8,'Brush Pen Set - 20 Colors',1,25.99),(33,8,'Brush Pen Set - 20 Colors',1,25.99),(34,7,'Prismacolor Premier Double-Ended Art Markers',1,38.98),(35,7,'Prismacolor Premier Double-Ended Art Markers',1,38.98),(36,5,'D\'Addario Helicore Viola String Set',1,52.08),(37,5,'D\'Addario Helicore Viola String Set',1,52.08),(38,5,'D\'Addario Helicore Viola String Set',1,52.08),(39,5,'D\'Addario Helicore Viola String Set',1,52.08),(40,5,'D\'Addario Helicore Viola String Set',1,52.08),(41,5,'D\'Addario Helicore Viola String Set',1,52.08),(42,5,'D\'Addario Helicore Viola String Set',1,52.08),(43,5,'D\'Addario Helicore Viola String Set',1,52.08),(44,5,'D\'Addario Helicore Viola String Set',1,52.08),(45,5,'D\'Addario Helicore Viola String Set',1,52.08),(46,5,'D\'Addario Helicore Viola String Set',1,52.08),(47,5,'D\'Addario Helicore Viola String Set',1,52.08),(48,5,'D\'Addario Helicore Viola String Set',4,208.32),(49,5,'D\'Addario Helicore Viola String Set',1,52.08),(50,5,'D\'Addario Helicore Viola String Set',1,52.08),(51,1,'Miles Kimball Knitting Tote Bag',5,39.95),(52,5,'D\'Addario Helicore Viola String Set',1,52.08),(53,5,'D\'Addario Helicore Viola String Set',1,52.08),(54,5,'D\'Addario Helicore Viola String Set',1,52.08),(55,5,'D\'Addario Helicore Viola String Set',1,52.08),(56,5,'D\'Addario Helicore Viola String Set',1,52.08),(57,4,'Treble Clef Pendant',2,27.98),(58,4,'Treble Clef Pendant',1,13.99),(59,5,'D\'Addario Helicore Viola String Set',1,52.08),(60,5,'D\'Addario Helicore Viola String Set',1,52.08),(61,5,'D\'Addario Helicore Viola String Set',1,52.08),(62,5,'D\'Addario Helicore Viola String Set',1,52.08),(63,5,'D\'Addario Helicore Viola String Set',2,104.16),(64,5,'D\'Addario Helicore Viola String Set',1,52.08),(65,5,'D\'Addario Helicore Viola String Set',1,52.08);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wholesale`
--

DROP TABLE IF EXISTS `wholesale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wholesale` (
  `wholesale_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `wholesale_quantity` int(11) NOT NULL,
  `wholesale_total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`wholesale_id`),
  KEY `itemID` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wholesale`
--

LOCK TABLES `wholesale` WRITE;
/*!40000 ALTER TABLE `wholesale` DISABLE KEYS */;
INSERT INTO `wholesale` VALUES (1,14,'Bowers & Wilkins P7 Wireless Headphones',2,151.00),(2,13,'Totoro Starry Night Poster',1,0.50),(3,10,'Magic Bullet Blender -  11 Piece Set',1,6.75),(4,11,'Fairy Tail Heartphilia Cosplay Dress',2,50.00),(5,3,'Thomastik Dominant 16.5\" Viola String Set',1,65.00),(6,1,'Miles Kimball Knitting Tote Bag',1,3.50);
/*!40000 ALTER TABLE `wholesale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bamazon_db'
--

--
-- Dumping routines for database 'bamazon_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-02  8:50:57
