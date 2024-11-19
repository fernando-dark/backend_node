Apps repo

TABLAS LIVERPOOL


CREATE TABLE GroupSSO (
    id SERIAL PRIMARY KEY,
    groupSSO VARCHAR(100) NOT NULL
);

CREATE TABLE "Group" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    creationDate TIMESTAMP NOT NULL,
    lastUpdate TIMESTAMP,
    lastUpdateUser VARCHAR(50),
    status INT NOT NULL
);

CREATE TABLE Role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    idGroupSSO INT NOT NULL,
    FOREIGN KEY (idGroupSSO) REFERENCES GroupSSO(id),
    
    -- Nuevos campos
    location INTEGER[] NOT NULL, 
    function INTEGER[] NOT NULL, 
    section INTEGER[] NOT NULL,
    personalarea VARCHAR(5)[] NOT NULL,
    personalgroup VARCHAR(2)[] NOT NULL,
    salarygrade VARCHAR(10)[] NOT NULL, 
    payrolltype VARCHAR(2)[] NOT NULL,
    society VARCHAR(2)[] NOT NULL
);


CREATE TABLE Tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    isBusiness BOOLEAN NOT NULL
);

CREATE TABLE ProfileAttribute (
    id SERIAL PRIMARY KEY,
    attributeId VARCHAR(50) NOT NULL,
    attributeType VARCHAR(50) NOT NULL,
    attributeValue VARCHAR(255) NOT NULL
);

CREATE TABLE Alert (
    id SERIAL PRIMARY KEY,
    priority VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    useExpiration BOOLEAN NOT NULL,
    startDate TIMESTAMP,
    endDate TIMESTAMP,
    useRoles BOOLEAN NOT NULL
);

CREATE TABLE AlertRole (
    alertId INT NOT NULL,
    roleId INT NOT NULL,
    PRIMARY KEY (alertId, roleId),
    FOREIGN KEY (alertId) REFERENCES Alert(id),
    FOREIGN KEY (roleId) REFERENCES Role(id)
);

CREATE TABLE App (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    accessMethod VARCHAR(50) NOT NULL,
    accessPoint VARCHAR(100) NOT NULL,
    imageUrl VARCHAR(255),
    status INT NOT NULL,
    lastUsed TIMESTAMP
);

CREATE TABLE Responsible (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE AppResponsible (
    appId INT NOT NULL,
    responsibleId INT NOT NULL,
    PRIMARY KEY (appId, responsibleId),
    FOREIGN KEY (appId) REFERENCES App(id),
    FOREIGN KEY (responsibleId) REFERENCES Responsible(id)
);

CREATE TABLE AppTag (
    appId INT NOT NULL,
    tagId INT NOT NULL,
    PRIMARY KEY (appId, tagId),
    FOREIGN KEY (appId) REFERENCES App(id),
    FOREIGN KEY (tagId) REFERENCES Tag(id)
);

CREATE TABLE GroupApp (
    appId INT NOT NULL,
    groupId INT NOT NULL,
    creationDate TIMESTAMP NOT NULL,
    PRIMARY KEY (appId, groupId),
    FOREIGN KEY (appId) REFERENCES App(id),
    FOREIGN KEY (groupId) REFERENCES "Group"(id)
);

CREATE TABLE GroupRole (
    id SERIAL PRIMARY KEY,
    idGroup INT NOT NULL,
    idRole INT NOT NULL,
    FOREIGN KEY (idGroup) REFERENCES "Group"(id),
    FOREIGN KEY (idRole) REFERENCES Role(id)
);

CREATE TABLE RoleAttribute (
    roleId INT NOT NULL,
    profileAttributeId INT NOT NULL,
    PRIMARY KEY (roleId, profileAttributeId),
    FOREIGN KEY (roleId) REFERENCES Role(id),
    FOREIGN KEY (profileAttributeId) REFERENCES ProfileAttribute(id)
);

CREATE TABLE AppAccess (
    appId INT NOT NULL,
    userId INT NOT NULL,
    lastAccessDate TIMESTAMP NOT NULL,
    PRIMARY KEY (appId, userId)
);

CREATE TABLE FavApps (
    id SERIAL PRIMARY KEY,
    appId INT NOT NULL,
    userId VARCHAR(100) NOT NULL,
    lastUsed TIMESTAMP,
    FOREIGN KEY (appId) REFERENCES App(id)
);

-- nueva Tabla
CREATE TABLE bussines (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Relacionar tabla con app
ALTER TABLE App
ADD COLUMN bussines INT,
ADD CONSTRAINT fk_bussines
    FOREIGN KEY (bussines) REFERENCES bussines(id);



    Consulta nombre del nuevo rol

    validar or en obtencion de app validando con el correo de colaborador
