CREATE TABLE "Conversation"
(
    "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
    "name" varchar(64) NOT NULL,
    "userA" INTEGER REFERENCES "Users"(id) ON DELETE RESTRICT NOT NULL ,
    "userB" INTEGER REFERENCES "Users"(id) ON DELETE RESTRICT NOT NULL,
    timestamp timestamp default current_timestamp,
    UNIQUE ("userA", "userB")
);

CREATE TABLE "Message"
(
    "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
    "conversationId" INTEGER REFERENCES "Conversation"(id) NOT NULL,
    "senderId" INTEGER REFERENCES "Users"(id) NOT NULL,
    "body" varchar(256),
    timestamp timestamp default current_timestamp
);

CREATE TABLE "Catalog"
(
    "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
    "name" varchar(64) NOT NULL,
    "userId" INTEGER REFERENCES "Users"(id) ON DELETE RESTRICT NOT NULL UNIQUE
);

CREATE TABLE "CatalogToConversation"
(
    "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
    "catalogId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    FOREIGN KEY ("catalogId") REFERENCES "Catalog"(id)  ON DELETE RESTRICT,
    FOREIGN KEY ("conversationId") REFERENCES "Conversation"(id)  ON DELETE RESTRICT
);

CREATE TABLE "BlackList"
(
    "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
    "userId" INTEGER REFERENCES "Users"(id) NOT NULL UNIQUE ,
    "blockedConversationId" INTEGER REFERENCES "Conversation"(id) NOT NULL
);

CREATE TABLE "FavouriteList"
(
    "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
    timestamp timestamp default current_timestamp,
    "userId" INTEGER REFERENCES "Users"(id) ON DELETE RESTRICT NOT NULL UNIQUE
);

CREATE TABLE "UserToFavouriteList"
(
    "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
    "userId" INTEGER NOT NULL,
    "favouriteListId" INTEGER NOT NULL,
    timestamp timestamp default current_timestamp,
    FOREIGN KEY ("userId") REFERENCES "Users"(id)  ON DELETE RESTRICT,
    FOREIGN KEY ("favouriteListId") REFERENCES "FavouriteList"(id)  ON DELETE RESTRICT
);