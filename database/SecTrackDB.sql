SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `Card`;
CREATE TABLE `Card` (
  `ID` int(32) NOT NULL AUTO_INCREMENT,
  `CardTypeID` int(11) NOT NULL,
  `CardNumber` varchar(32) NOT NULL,
  `UserID` int(10) unsigned DEFAULT NULL,
  `Location` varchar(32) NOT NULL,
  `Comment` varchar(256) DEFAULT NULL,
  `ExpirationDate` varchar(128) NOT NULL,
  `CreationDate` varchar(128) NOT NULL,
  `ModifiedDate` varchar(128) NOT NULL,
  `StatusTypeID` tinyint(4) NOT NULL,
  `ActiveReceiptID` int(11) DEFAULT NULL,
  `LastVerificationID` int(11) DEFAULT NULL,
  `LastSelfCheckID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserID` (`UserID`),
  KEY `ActiveReceipt` (`ActiveReceiptID`),
  KEY `LastVerification` (`LastVerificationID`),
  KEY `LastSelfCheck` (`LastSelfCheckID`),
  KEY `CardType` (`CardTypeID`),
  KEY `Status` (`StatusTypeID`),
  CONSTRAINT `Card_ibfk_10` FOREIGN KEY (`StatusTypeID`) REFERENCES `StatusType` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Card_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`),
  CONSTRAINT `Card_ibfk_5` FOREIGN KEY (`ActiveReceiptID`) REFERENCES `Receipt` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Card_ibfk_6` FOREIGN KEY (`LastVerificationID`) REFERENCES `Verification` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Card_ibfk_7` FOREIGN KEY (`LastSelfCheckID`) REFERENCES `Verification` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Card_ibfk_9` FOREIGN KEY (`CardTypeID`) REFERENCES `CardType` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `CardType`;
CREATE TABLE `CardType` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  `CreationDate` varchar(128) NOT NULL,
  `ModifiedDate` varchar(128) DEFAULT NULL,
  `StatusTypeID` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Status` (`StatusTypeID`),
  CONSTRAINT `CardType_ibfk_1` FOREIGN KEY (`StatusTypeID`) REFERENCES `StatusType` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `CardType` (`ID`, `Name`, `CreationDate`, `ModifiedDate`, `StatusTypeID`) VALUES
(1,	'DBK',	'2018-05-22T09:38:01.219Z',	'2018-05-22T12:09:21.780Z',	5),
(2,	'Q-cert',	'2018-05-22T09:38:01.219Z',	'2018-05-22T12:09:21.780Z',	5),
(3,	'NBR-sim',	'2018-05-22T09:38:01.219Z',	'2018-05-22T12:09:21.780Z',	5),
(4,	'TeLD',	'2018-05-22T09:38:01.219Z',	'2018-05-22T12:09:21.780Z',	5),
(5,	'GEID',	'2018-05-22T09:38:01.219Z',	'2018-05-22T12:09:21.780Z',	5);

DROP TABLE IF EXISTS `Delivery`;
CREATE TABLE `Delivery` (
  `ID` int(32) NOT NULL AUTO_INCREMENT,
  `DocumentTypeID` int(11) NOT NULL,
  `DocumentNumber` varchar(32) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `DocumentDate` varchar(128) NOT NULL,
  `SentDate` varchar(128) NOT NULL,
  `CreationDate` varchar(128) NOT NULL,
  `ModifiedDate` varchar(128) NOT NULL,
  `Receiver` varchar(32) NOT NULL,
  `Comment` varchar(256) DEFAULT NULL,
  `StatusTypeID` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `DocumentType` (`DocumentTypeID`),
  KEY `Status` (`StatusTypeID`),
  CONSTRAINT `Delivery_ibfk_2` FOREIGN KEY (`StatusTypeID`) REFERENCES `StatusType` (`ID`),
  CONSTRAINT `Delivery_ibfk_3` FOREIGN KEY (`DocumentTypeID`) REFERENCES `DocumentType` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `Document`;
CREATE TABLE `Document` (
  `ID` int(32) NOT NULL AUTO_INCREMENT,
  `DocumentTypeID` int(11) NOT NULL,
  `DocumentNumber` varchar(32) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Sender` varchar(32) NOT NULL,
  `DocumentDate` varchar(128) NOT NULL,
  `RegistrationDate` varchar(128) NOT NULL,
  `CreationDate` varchar(128) NOT NULL,
  `ModifiedDate` varchar(128) NOT NULL,
  `UserID` int(10) unsigned DEFAULT NULL,
  `Location` varchar(32) NOT NULL,
  `Comment` varchar(256) DEFAULT NULL,
  `StatusTypeID` tinyint(4) NOT NULL,
  `ActiveReceiptID` int(11) DEFAULT NULL,
  `LastVerificationID` int(11) DEFAULT NULL,
  `LastSelfCheckID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `DocumentType` (`DocumentTypeID`),
  KEY `UserID` (`UserID`),
  KEY `Status` (`StatusTypeID`),
  KEY `ActiveReceipt` (`ActiveReceiptID`),
  KEY `LastVerification` (`LastVerificationID`),
  KEY `LastSelfCheck` (`LastSelfCheckID`),
  CONSTRAINT `Document_ibfk_1` FOREIGN KEY (`DocumentTypeID`) REFERENCES `DocumentType` (`ID`),
  CONSTRAINT `Document_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`),
  CONSTRAINT `Document_ibfk_3` FOREIGN KEY (`StatusTypeID`) REFERENCES `StatusType` (`ID`),
  CONSTRAINT `Document_ibfk_6` FOREIGN KEY (`ActiveReceiptID`) REFERENCES `Receipt` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Document_ibfk_8` FOREIGN KEY (`LastVerificationID`) REFERENCES `Verification` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Document_ibfk_9` FOREIGN KEY (`LastSelfCheckID`) REFERENCES `Verification` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `DocumentType`;
CREATE TABLE `DocumentType` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  `CreationDate` varchar(128) NOT NULL,
  `ModifiedDate` varchar(128) DEFAULT NULL,
  `StatusTypeID` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Status` (`StatusTypeID`),
  CONSTRAINT `DocumentType_ibfk_1` FOREIGN KEY (`StatusTypeID`) REFERENCES `StatusType` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `DocumentType` (`ID`, `Name`, `CreationDate`, `ModifiedDate`, `StatusTypeID`) VALUES
(1,	'H/T',	'2018-05-22T09:38:01.219Z',	'2018-05-22T12:09:21.780Z',	5),
(2,	'H/S',	'2018-05-22T09:38:01.219Z',	'2018-05-22T12:09:21.780Z',	5);

DROP TABLE IF EXISTS `ItemType`;
CREATE TABLE `ItemType` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ItemType` (`ID`, `Name`) VALUES
(1,	'Card'),
(2,	'Document');

DROP TABLE IF EXISTS `LogEvent`;
CREATE TABLE `LogEvent` (
  `ID` int(32) NOT NULL AUTO_INCREMENT,
  `ItemTypeID` int(11) NOT NULL,
  `CardID` int(32) DEFAULT NULL,
  `DocumentID` int(32) DEFAULT NULL,
  `UserID` int(32) unsigned DEFAULT NULL,
  `LogTypeID` int(32) DEFAULT NULL,
  `LogDate` varchar(128) NOT NULL,
  `LogData` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ItemTypeID` (`ItemTypeID`),
  KEY `CardID` (`CardID`),
  KEY `DocumentID` (`DocumentID`),
  KEY `UserID` (`UserID`),
  KEY `LogTypeID` (`LogTypeID`),
  CONSTRAINT `LogEvent_ibfk_1` FOREIGN KEY (`ItemTypeID`) REFERENCES `ItemType` (`ID`),
  CONSTRAINT `LogEvent_ibfk_2` FOREIGN KEY (`CardID`) REFERENCES `Card` (`ID`),
  CONSTRAINT `LogEvent_ibfk_3` FOREIGN KEY (`DocumentID`) REFERENCES `Document` (`ID`),
  CONSTRAINT `LogEvent_ibfk_4` FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`),
  CONSTRAINT `LogEvent_ibfk_6` FOREIGN KEY (`LogTypeID`) REFERENCES `LogType` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `LogType`;
CREATE TABLE `LogType` (
  `ID` int(32) NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  `LogText` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `LogType` (`ID`, `Name`, `LogText`) VALUES
(1,	'Inkvittering',	'Inkvittering av $data'),
(2,	'Utkvittering',	'Utkvittering av $data'),
(3,	'Skapat',	'$data skapades'),
(4,	'Ändring',	'$data ändrades'),
(5,	'Status',	'Ändrade status på $data'),
(6,	'Inventering',	'$data inventerades'),
(7,	'Egenkontroll',	'Egenkontroll av $data utfördes');

DROP TABLE IF EXISTS `Receipt`;
CREATE TABLE `Receipt` (
  `ID` int(32) NOT NULL AUTO_INCREMENT,
  `ItemTypeID` int(11) NOT NULL,
  `CardID` int(11) DEFAULT NULL,
  `DocumentID` int(11) DEFAULT NULL,
  `UserID` int(10) unsigned NOT NULL,
  `StartDate` varchar(128) NOT NULL,
  `EndDate` varchar(128) DEFAULT NULL,
  `PDFName` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserID` (`UserID`),
  KEY `ItemTypeID` (`ItemTypeID`),
  KEY `DocumentID` (`DocumentID`),
  KEY `CardID` (`CardID`),
  CONSTRAINT `Receipt_ibfk_4` FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`),
  CONSTRAINT `Receipt_ibfk_5` FOREIGN KEY (`ItemTypeID`) REFERENCES `ItemType` (`ID`),
  CONSTRAINT `Receipt_ibfk_6` FOREIGN KEY (`ItemTypeID`) REFERENCES `ItemType` (`ID`),
  CONSTRAINT `Receipt_ibfk_7` FOREIGN KEY (`DocumentID`) REFERENCES `Document` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Receipt_ibfk_8` FOREIGN KEY (`CardID`) REFERENCES `Card` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `StatusType`;
CREATE TABLE `StatusType` (
  `ID` tinyint(4) NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `StatusType` (`ID`, `Name`) VALUES
(1,	'Tillgänglig'),
(2,	'Utkvitterad'),
(3,	'Arkiverad'),
(4,	'Borttappad'),
(5,	'Aktiv'),
(6,	'Inaktiv');

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `ID` int(32) unsigned NOT NULL AUTO_INCREMENT,
  `UserTypeID` int(11) NOT NULL,
  `Username` varchar(32) NOT NULL,
  `Password` varchar(128) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `CreationDate` varchar(128) NOT NULL,
  `ModifiedDate` varchar(128) NOT NULL,
  `StatusTypeID` tinyint(4) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserType` (`UserTypeID`),
  KEY `Status` (`StatusTypeID`),
  CONSTRAINT `User_ibfk_2` FOREIGN KEY (`UserTypeID`) REFERENCES `UserType` (`ID`),
  CONSTRAINT `User_ibfk_3` FOREIGN KEY (`StatusTypeID`) REFERENCES `StatusType` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `User` (`ID`, `UserTypeID`, `Username`, `Password`, `Name`, `Email`, `CreationDate`, `ModifiedDate`, `StatusTypeID`) VALUES
(1,	1,	'admin',	'$2a$12$AxtSOw9EBkz7PFiTbM1BlOHh2Qrwv4DVCus51u4sPVkclRxH912Ze',	'Registrator',	'reg@istrat.or',	'2018-05-22T11:37:28.547Z',	'2018-05-22T11:37:28.547Z',	5);

-- password: pum123

DROP TABLE IF EXISTS `UserType`;
CREATE TABLE `UserType` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `UserType` (`ID`, `Name`) VALUES
(1,	'Admininstratör'),
(2,	'Användare');

DROP TABLE IF EXISTS `Verification`;
CREATE TABLE `Verification` (
  `ID` int(32) NOT NULL AUTO_INCREMENT,
  `VerificationTypeID` int(10) unsigned NOT NULL,
  `ItemTypeID` int(11) NOT NULL,
  `CardID` int(11) DEFAULT NULL,
  `DocumentID` int(11) DEFAULT NULL,
  `UserID` int(10) unsigned DEFAULT NULL,
  `VerificationDate` varchar(128) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `VerificationType` (`VerificationTypeID`),
  KEY `ItemTypeID` (`ItemTypeID`),
  KEY `DocumentID` (`DocumentID`),
  KEY `UserID` (`UserID`),
  KEY `CardID` (`CardID`),
  CONSTRAINT `Verification_ibfk_1` FOREIGN KEY (`VerificationTypeID`) REFERENCES `VerificationType` (`ID`),
  CONSTRAINT `Verification_ibfk_16` FOREIGN KEY (`DocumentID`) REFERENCES `Document` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Verification_ibfk_17` FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Verification_ibfk_18` FOREIGN KEY (`CardID`) REFERENCES `Card` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `Verification_ibfk_2` FOREIGN KEY (`ItemTypeID`) REFERENCES `ItemType` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `VerificationType`;
CREATE TABLE `VerificationType` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `VerificationType` (`ID`, `Name`) VALUES
(1,	'SelfCheck'),
(2,	'InventoryCheck');
