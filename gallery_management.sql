-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: gallery_management
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `artist_id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Nationality` varchar(45) DEFAULT NULL,
  `Bio` text,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Jack','Mills','American','Jack Mills, a distinguished American painter,\n showcases his mastery through vibrant cityscape paintings that capture the pulsating\n energy and urban beauty of American metropolises.'),(2,'Claude','Monet','French','French Impressionist master, \nrenowned for his innovative use of color \nand light to capture the fleeting beauty of nature.'),(3,'Gustave','Courbet','French','Prominent French Realist \npainter who challenged artistic norms in the 19th century, \nportraying everyday life with raw honesty.'),(4,'Paul','Cezanne','French','French Post-Impressionist painter, known \nfor bridging the gap between Impressionism and Cubism with his innovative approach.'),(5,'Pablo','Picasso','Spanish','Spanish painter and sculptor, co-founder of Cubism \nand one of the most influential artists of the 20th century.'),(6,'Ravi','Varma','Indian','Indian painter, often hailed as one of the greatest \nartists in the history of Indian art, known for his realistic and iconic depictions.'),(7,'Swati','Kale','Indian','Indian painter known for her captivating depictions of \nnature in vibrant and evocative artworks.'),(8,'Vincent','van Gogh','Dutch','Dutch Post-Impressionist painter, known for his \nexpressive use of color and emotional impact in works like \"Starry Night.\"'),(9,'Wassily','Kandinsky','Russian',' Russian painter and art theorist, a pioneer \nof abstract art, famous for his vibrant and dynamic compositions.'),(10,'Camille','Pissarro','French','Camille Pissarro was a Danish-French Impressionist and Neo-Impressionist painter born on the island of St Thomas (now in the US Virgin Islands, but then in the Danish West Indies).'),(11,'Marc','Chagall','Russian','Marc Chagall was a Russian-French modernist artist whose work anticipated the dream-like images of Surrealism.'),(12,'Childe','Hassam','American','Frederick Childe Hassam was an American Impressionist painter, noted for his urban and coastal scenes.'),(13,'Canaletto',NULL,'Italian','Giovanni Antonio Canal, known as Canaletto, was an Italian painter of city views or vedute, of Venice.'),(14,'Johannes','Vermeer','Dutch','Johannes Vermeer was a Dutch Baroque Period painter who specialized in domestic interior scenes of middle-class life.'),(15,'Edward','Hopper','American','Edward Hopper was an American realist painter and printmaker.'),(16,'Richard','Diebenkorn','American','Richard Diebenkorn was an American painter and printmaker. His early work is associated with abstract expressionism and the Bay Area Figurative Movement of the 1950s and 1960s.'),(17,'Gustave','Caillebotte','French','Gustave Caillebotte was a French painter, member and patron of the artists known as Impressionists, although he painted in a more realistic manner and did not exhibit with them regularly.');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artwork`
--

DROP TABLE IF EXISTS `artwork`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artwork` (
  `ARTIST_ID` int NOT NULL,
  `ART_ID` int NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(50) NOT NULL,
  `TYPE` varchar(50) DEFAULT NULL,
  `STATUS` varchar(1) DEFAULT NULL,
  `IMG_LINK` varchar(50) DEFAULT NULL,
  `PRICE` decimal(10,0) DEFAULT NULL,
  `EXH_ID` int DEFAULT NULL,
  PRIMARY KEY (`ART_ID`),
  KEY `ARTIST_ID_idx` (`ARTIST_ID`),
  KEY `EXH_ID_idx` (`EXH_ID`),
  CONSTRAINT `ARTIST_ID` FOREIGN KEY (`ARTIST_ID`) REFERENCES `artists` (`artist_id`),
  CONSTRAINT `EXH_ID` FOREIGN KEY (`EXH_ID`) REFERENCES `exhibitions` (`E_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artwork`
--

LOCK TABLES `artwork` WRITE;
/*!40000 ALTER TABLE `artwork` DISABLE KEYS */;
INSERT INTO `artwork` VALUES (1,1,'The Little street','acrylic','1','the little street.webp',5000,1),(1,2,'Cityscape','acrylic','0','CityScape.webp',8000,1),(10,4,'The Boulevard Montmartre at Night','Cityscape','0','Paris-Street-Rainy-Day.webp',45000,5),(14,5,'View of Delft','Cityscape','1','Boulevard-Montmartre-Night-Effect.webp',30000,5),(14,6,'The Little Street','Cityscape','0','the little street.webp',64000,5),(15,7,'Nighthawks','Cityscape','0','nighthawks.jpg.webp',30000,3),(16,8,'Cityscape','Cityscape','0','Cityscape.webp',85000,3),(13,9,'The Stonemason’s Yard','Cityscape','1','The-Stonemasons.webp',37000,3),(2,10,'Boulevard des Capucines','Cityscape','1','Boulevard des Capucines.webp',70000,3),(12,11,'Late Afternoon','Cityscape','1','Late-Afternoon-New-York-Winter-1900-.webp',60000,3),(11,12,'Paris Through the Window','Cityscape','0','Paris-through-the-Window-Marc.webp',40000,5),(2,13,'flowers on the riverbank','nature','1','flowers on the riverbank.jpg',45000,4),(2,14,'water lilies','nature','0','water lilies.jpg',20000,4),(2,15,'Three Cows Grazing','nature','0','three cows grazing.jpg',40000,4),(2,16,'The Cliff','nature','0','the cliff.jpg',60000,4),(7,18,'sunflowers','nature','1','sunflowers.jpg',48000,4),(7,19,'serenity bloom','nature','0','serenity bloom.jpg',78000,4),(7,20,'FindingBeautyintheWild','nature','1','FindingBeautyintheWild.jpg',38000,4),(7,21,'breezy day','nature','1','breezy day.jpg',80000,4),(8,22,'Sunset','nature','1','Sunset.jpg',55000,4),(5,23,'Dove','nature','1','dove.jpg',90000,4),(6,24,'Arjuna and Subhadra','historical','0','arjuna-and-subhadra.jpg',40000,10),(6,25,'Dhruv Narayan','historical','1','dhruv-narayan.jpg',35000,10),(6,26,'Jatayu Vadham','historical','1','jatayu-vadham.jpg',51000,10),(6,27,'Maharaja Fateh Singh','historical','1','maharaja-fateh-singh.jpg',65000,10),(6,28,'Maharana Prathap Singh','historical','0','maharana-prathap-singh.jpg',47000,10),(6,29,'Goddess Saraswati','historical','0','painting-of-the-goddess-saraswati.jpg',90000,10),(6,30,'Rajaputra Soldier','historical','0','rajaputra-soldier.jpg',86000,10),(6,31,'Sri Rama breaking the bow','historical','0','sri-rama-breaking-the-bow.jpg',60000,10),(6,32,'Sri Rama vanquishing the Sea','historical','0','sri-rama-vanquishing-the-sea.jpg',44000,10),(8,33,'Old Mill','historical','0','Old mill.jpg',80000,10);
/*!40000 ALTER TABLE `artwork` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curator`
--

DROP TABLE IF EXISTS `curator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curator` (
  `CURATOR_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) DEFAULT NULL,
  `PHONE` varchar(20) DEFAULT NULL,
  `EMAIL` varchar(45) DEFAULT NULL,
  `GALLERY_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`CURATOR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=894 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curator`
--

LOCK TABLES `curator` WRITE;
/*!40000 ALTER TABLE `curator` DISABLE KEYS */;
INSERT INTO `curator` VALUES (1,'Praveen','6574757678','praveeen@gmai.com','1'),(2,'Mahendar','5676838576','Mahendar@gmail.com','2'),(3,'Nishanth','1546734655','Nishanth@gmail.com','3'),(4,'Shruti Rajagopalan','9978574533','shruti_rajagopalan@gmail.com','4'),(5,'Arghya','6476657858','arghya@gmail.com','5'),(6,'Amit Varma','9647868776','amitVarma@gmail.com','6'),(7,'Murali Neelakantan','9583859039','m_neelakantan@gmail.com','7'),(8,'Madhav Khosla','8356577955','madhav_khosla@gmail.com','8');
/*!40000 ALTER TABLE `curator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CUST_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) DEFAULT NULL,
  `PHONE_NO` varchar(45) DEFAULT NULL,
  `EMAIL` varchar(45) DEFAULT NULL,
  `ART_ID` int DEFAULT NULL,
  `TRANSACTION_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`CUST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (18,'Amruthamsh Adruguli','09632589556','amruthaamsh@gmail.com',14,'2024-02-01 13:24:31'),(22,'Kusuma A','09448628328','suma.amsh@gmail.com',8,'2024-02-01 13:26:03'),(23,'Abhishek G L','07899434663','abhishekgl1659655@gmail.com',7,'2024-02-01 13:26:16'),(24,'Kusuma A','09448628328','suma.amsh@gmail.com',1,'2024-02-01 13:36:36'),(25,'Amruthamsh A','09448628328','amruthaamsh@gmail.com',25,'2024-02-01 13:36:57');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exhibitions`
--

DROP TABLE IF EXISTS `exhibitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exhibitions` (
  `E_ID` int NOT NULL AUTO_INCREMENT,
  `EXH_NAME` varchar(80) DEFAULT NULL,
  `GALLERY_ID` int DEFAULT NULL,
  `START_DATE` datetime DEFAULT NULL,
  `END_DATE` datetime DEFAULT NULL,
  `THEME` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`E_ID`),
  UNIQUE KEY `E_ID_UNIQUE` (`E_ID`),
  KEY `GALLERY_ID_idx` (`GALLERY_ID`),
  CONSTRAINT `GALLERY_ID` FOREIGN KEY (`GALLERY_ID`) REFERENCES `gallery` (`GAL_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exhibitions`
--

LOCK TABLES `exhibitions` WRITE;
/*!40000 ALTER TABLE `exhibitions` DISABLE KEYS */;
INSERT INTO `exhibitions` VALUES (1,'Visions Unveiled: Contemporary Art Showcase',1,'2024-02-01 00:00:00','2024-02-07 00:00:00','Contemporary Art'),(2,'Canvas Chronicles: A Visual Journey',1,'2024-06-05 00:00:00','2024-06-14 00:00:00','Impressionist Paintings'),(3,'Mark Rothko: Paintings on Paper',2,'2024-01-05 00:00:00','2024-01-26 00:00:00','Colorful Art'),(4,'Abstract Perspectives: Colors in Motion',2,'2024-04-05 00:00:00','2024-04-05 00:00:00','Abstract Art Fusion'),(5,'Ephemeral Expressions: Art in Flux',3,'2024-12-22 00:00:00','2024-12-22 00:00:00','Impressionist Paintings'),(6,'Cultural Kaleidoscope: Global Art Fusion',4,'2024-10-30 00:00:00','2024-11-30 00:00:00','Cultural Diversity'),(7,'Emerging Echoes: New Artists Unveiled',5,'2024-02-02 00:00:00','2024-02-02 00:00:00','Innovative Art'),(8,'Etched by Light: Photogravures from the Collection, 1840–1940',2,'2023-12-05 00:00:00','2024-01-15 00:00:00','Innovative Art'),(9,'Modern Masters Showcase',2,'2022-03-01 00:00:00','2022-03-15 00:00:00','Contemporary Art'),(10,'Abstract Expressions',3,'2022-04-01 00:00:00','2022-04-15 00:00:00','Abstract Art'),(11,'Impressionist Odyssey',3,'2022-05-01 00:00:00','2022-05-15 00:00:00','Impressionist Paintings'),(12,'Nature\'s Palette',4,'2023-03-15 00:00:00','2023-03-30 00:00:00','Nature-Inspired Art'),(13,'Cityscapes Collection',5,'2023-04-10 00:00:00','2023-04-25 00:00:00','Urban Landscapes'),(14,'Expressions in Color',6,'2023-05-01 00:00:00','2023-05-15 00:00:00','Colorful Creations'),(15,'Photography Showcase',7,'2021-03-20 00:00:00','2021-04-05 00:00:00','Photographic Art'),(16,'Cultural Fusion',7,'2021-04-15 00:00:00','2021-04-30 00:00:00','Cultural Diversity'),(17,'Abstract Fusion',8,'2021-05-10 00:00:00','2021-05-25 00:00:00','Abstract Art Fusion'),(18,'Sculpture Symposium',8,'2020-03-05 00:00:00','2020-03-20 00:00:00','Sculptural Creations'),(19,'Vibrant Colors Exhibition',1,'2020-04-05 00:00:00','2020-04-20 00:00:00','Colorful Art'),(20,'Innovative Art Forms',2,'2020-05-01 00:00:00','2020-05-15 00:00:00','Innovative Art');
/*!40000 ALTER TABLE `exhibitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `GAL_ID` int NOT NULL,
  `GALLERY_NAME` varchar(45) DEFAULT NULL,
  `LOCATION` varchar(45) DEFAULT NULL,
  `CURATOR_ID` varchar(45) DEFAULT NULL,
  `IMG_LINK` varchar(45) DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`GAL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (1,'The Urban Art Space','Bengaluru','1','1.jpg','Immerse yourself in the vibrant and contemporary world of urban art at The Urban Art Space in Bengaluru. This innovative gallery showcases a fusion of street art, digital expressions, and modern aesthetics. Step into a dynamic space where the city\'s pulse meets artistic expression, providing a unique and ever-evolving experience for art enthusiasts.'),(2,'Digital Dreams Gallery','Chennai','2','2.webp','At Digital Dreams Gallery in Chennai, technology meets art in a mesmerizing display of digital creativity. Explore the intersection of the virtual and the tangible through captivating exhibits that push the boundaries of traditional art forms. This gallery serves as a platform for digital artists to showcase their innovative visions and redefine the art landscape in the digital age.'),(3,'Pop-Up Palette Pavilion','Hyderabad','3','3.jpg','Experience art in a transient and dynamic form at the Pop-Up Palette Pavilion in Hyderabad. This innovative space constantly reinvents itself, featuring temporary installations, interactive exhibits, and pop-up galleries that bring a sense of spontaneity to the art scene. Get ready for a unique journey through artistic surprises and a celebration of creativity in every pop-up display.'),(4,'The Sculpture Sanctuary','Hyderabad','4','4.jpg','Nestled in the heart of Hyderabad, The Sculpture Sanctuary is a haven for admirers of three-dimensional art. Explore a tranquil environment where sculptures come to life, showcasing a diverse range of styles and materials. This outdoor sanctuary invites visitors to engage with art in a natural setting, fostering a deep connection between the viewer and the sculptural masterpieces on display.'),(5,'Renaissance Hub','Bengaluru','5','5.jpg','Renaissance Hub in Bengaluru is a cultural epicenter where art, innovation, and community converge. This dynamic space serves as a hub for emerging and established artists alike, offering a platform for creativity to flourish. From contemporary exhibits to collaborative projects, Renaissance Hub fosters a renaissance of artistic expression in the bustling city of Bengaluru.'),(6,'Echoes of Easel','Chennai','6','6.jpg','Echoes of Easel in Chennai echoes with the harmonious blend of traditional and contemporary art forms. Step into a gallery that celebrates the timeless beauty of easel-based creations, featuring a diverse collection of paintings that tell stories, evoke emotions, and showcase the rich tapestry of artistic expressions. Immerse yourself in the echoes of creativity that resonate within these gallery walls.'),(7,'Fusion Gallery','Mysore','7','7.png','In the heart of Mysore, Fusion Gallery is a melting pot of artistic styles and cultural influences. This gallery showcases a fusion of traditional and modern art, providing a visual feast for art enthusiasts. Expect to encounter a diverse range of mediums, techniques, and inspirations that come together harmoniously in this eclectic '),(8,'Spectrum Haven','Hyderabad','8','8.png','Spectrum Haven in Hyderabad is a kaleidoscope of artistic expression, featuring a spectrum of colors, styles, and ideas. This vibrant gallery serves as a haven for artists and art lovers alike, offering a dynamic space where creativity knows no bounds. Explore the rich diversity of artistic visions as you navigate through the ever-changing spectrum of exhibits at this energetic gallery.');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-01 16:05:50
