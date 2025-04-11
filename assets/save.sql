
  CREATE TABLE users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(255) UNIQUE,
      ip VARCHAR(255), 
      balance DECIMAL(40,2) DEFAULT 0.00,
      caseOpened INT DEFAULT(0),
      loseMoney FLOAT DEFAULT(0),
      password VARCHAR(255) NOT NULL
  );
  
"name","price","rarity","type","wear","souvenir","imgURL"

  CREATE TABLE items (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,          -- "AK-47 | Красная линия"
      price VARCHAR(255) NOT NULL,           -- Базовая стоимость
      rarity ENUM(
        'Consumer Grade','Consumer Grade Sniper',
        'Mil-Spec Grade','StatTrak™ Mil-Spec Grade',
        'Industrial Grade','StatTrak™ Industrial Grade',
        'Restricted','StatTrak™ Restricted',
        'Classified','StatTrak™ Classified',
        'High Grade','StatTrak™ High Grade',
        'Covert','★ Covert','StatTrak™ Covert',
        'Base Grade','',
        'Remarkable',
        'Superior',
        'Distinguished',
        'Extraordinary',
        'Exceptional',
        'Master',
        'Exotic',
        'Contraband','StatTrak™ Contraband'
      ),
      type VARCHAR(255),
      wear VARCHAR(255),
      souvenir BOOLEAN DEFAULT 0,
      imgURL VARCHAR(500)
  );


  CREATE TABLE usersInventory (
      id INT PRIMARY KEY AUTO_INCREMENT,
      userId INT NOT NULL,
      itemId INT NOT NULL,
      floatValue FLOAT(9,8) DEFAULT 0.0,   -- Значение износа (например, 0.154321)
      pattern INT DEFAULT 0,               -- Паттерн скина
      isTradable BOOLEAN DEFAULT TRUE,
      obtainedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (itemId) REFERENCES items(id)
  );

   CREATE INDEX idxUserId ON usersInventory(userId);
   CREATE INDEX idxItemId ON usersInventory(itemId);

   LOAD DATA INFILE '/var/www/casino.vardie.ru/assets/items.csv'
   INTO TABLE items
   FIELDS TERMINATED BY ','
   ENCLOSED BY '"'
   LINES TERMINATED BY '\n'
   IGNORE 1 ROWS
   (name,price,rarity,type,wear,souvenir,imgURL);