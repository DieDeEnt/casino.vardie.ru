
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


  CREATE TABLE users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      balance DECIMAL(40,2) DEFAULT 0.00  -- Деньги на счету
  );
  


  CREATE TABLE items (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,          -- "AK-47 | Красная линия"
      basePrice DECIMAL(40,2),           -- Базовая стоимость
      -- rarity ENUM(
      --   'Consumer Grade',
      --   'Mil-Spec Grade',
      --   'Industrial Grad',
      --   'Restricted',
      --   'Classified',
      --   'High Grade',
      --   'Covert',
      --   'Base Grade',
      --   'Remarkable',
      --   'Superior',
      --   'Distinguished',
      --   'Extraordinary',
      --   'Exceptional',
      --   'Master',
      --   'Exotic',
      --   'Contraband'
      -- ),
      type ENUM(
        'key', 
        'container',      
        'Bayonet',
        'Butterfly Knife',
        'Falchion Knife',
        'Flip Knife',
        'Gut Knife',
        'Huntsman Knife',
        'Karambit',
        'M9 Bayonet',
        'Shadow Daggers',
        'Bowie Knife',
        'Ursus Knife',
        'Navaja Knife',
        'Stiletto Knife',
        'Talon Knife',
        'Classic Knife',
        'Skeleton Knife',
        'Paracord Knife',
        'Survival Knife',
        'Nomad Knife',
        'Glock-18',
        'P2000',
        'USP-S',
        'Dual Berettas',
        'P250',
        'Tec-9',
        'CZ75-Auto',
        'Five-SeveN',
        'Desert Eagle',
        'R8 Revolver',
        'MAC-10',
        'MP9',
        'MP7',
        'MP5-SD',
        'UMP-45',
        'P90',
        'PP-Bizon',
        'Nova',
        'XM1014',
        'Sawed-Off',
        'MAG-7',
        'M249',
        'Negev',
        'Galil AR',
        'FAMAS',
        'AK-47',
        'M4A4',
        'M4A1-S',
        'SSG 08',
        'SG 553',
        'AUG',
        'AWP',
        'G3SG1',
        'SCAR-20',
        'Zeus x27'
      ),
      imageUrl VARCHAR(255)
  );


  CREATE TABLE usersInventory (
      id INT PRIMARY KEY AUTO_INCREMENT,
      userId INT NOT NULL,
      itemId INT NOT NULL,
      floatValue FLOAT(9,8) DEFAULT 0.0,   -- Значение износа (например, 0.154321)
      pattern INT DEFAULT 0,               -- Паттерн скина
      quality ENUM(
        'factory_new',   -- от 0.00 до 0.07
        'minimal_wear',  -- от 0.07 до 0.15
        'field_tested',  -- от 0.15 до 0.37
        'well_worn',     -- от 0.37 до 0.45
        'battle_scarred' -- от 0.45 до 1.00
        ),
      isTradable BOOLEAN DEFAULT TRUE,
      obtainedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (itemId) REFERENCES items(id)
  );

   CREATE INDEX idxUserId ON usersInventory(userId);
   CREATE INDEX idxItemId ON usersInventory(itemId);