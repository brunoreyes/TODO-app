
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "reminders" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "description" varchar,
   "link" varchar,
  "repeat" varchar,
  "date" timestamp,
  "end_date" timestamp,
  "category_id" int references "category", 
  "user_id" int references "user"
);

CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "link" varchar,
  "image_url" varchar,
  "priority" varchar,
  "duration" time,
  "complete" boolean,
  "repeat" varchar,
  "date" date,
  "due_date" timestamp,
  "streak_count" int,
  "category_id" int references "category", 
  "reminder_id" int references "reminders", 
  "user_id" int references "user"
);

CREATE TABLE "ideas" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "link" varchar,
  "image_url" varchar,
  "favorited" boolean,
  "date" date,
  "view_count" int,
  "category_id" int references "category",  
  "reminder_id" int references "reminders",  
  "user_id" int references "user"
);

CREATE TABLE "memories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "date" date,
  "favorited" boolean,
  "view_count" int,
  "streak_count" int,
  "user_id" int references "user"
);

Select * from memories;
INSERT INTO "category" ("id","name")
VALUES
(1001,"Relationship"),
(1002,"Work"),
(1003,"Personal Work"),
(1004,"Fitness"),
(1005,"Music"),
(1006,"Art"),
(1007,"School"),
(1008,"Finance");
INSERT INTO "category" ("id","name")
VALUES
(1009,"Travel");

INSERT INTO "category" ("id","name")
VALUES
(1010,"Food");
INSERT INTO "ideas" ("name", "description","link","image_url","favorited","date","view_count","category_id","reminder_id","user_id")
VALUES ( "possible travel spots" , "Germany, New Zealand, France, Spain, Budapest","","","no", "8/05/2020", "2", 1009, null, 1),
( "TODO app idea" , "An app that takes care of Tasks, Reminders, Ideas, and Memories","","", "yes", "8/04/2020", "5", 1003, null, 1);

INSERT INTO "ideas" ("name", "description","link","image_url","favorited","date","view_count","category_id","reminder_id","user_id")
VALUES ( "possible places to eat" , "Mumu, JJs Poke","","","no", "8/05/2020", "2", 1010, null, 2)
;
select * from "category"
ORDER BY "name" ASC;
SELECT "ideas".*, "category"."name" AS "category" FROM "ideas"
JOIN "category" on "ideas"."category_id" = "category"."id"
 WHERE user_id=1;
 SELECT "ideas".*, "category"."name" AS "category" FROM "ideas"
JOIN "category" on "ideas"."category_id" = "category"."id"
 WHERE user_id=1
 ORDER BY "date" ASC;
select * from "user";


UPDATE "ideas" SET ( "name","description",  "link", "image_url", "category_id",
  "favorited","date", "user_id")
  VALUES ( $1, $2, $3, $4, $5 , $6, $7, $8 );
  
  UPDATE ideas SET name="dog", description="dog", link="dog", image_url="dog", category_id=1001, favorited=true, date="12/06/1996", user_id=1 WHERE id=74;
  
  SELECT * FROM ideas;
  
  SELECT "ideas" .*, "category"."name" AS "category" FROM "ideas"
JOIN "category" on "ideas"."category_id" = "category"."id"
WHERE user_id=1
 ORDER BY "name" ASC;
 SELECT "ideas" .*, "category"."name" AS "category" FROM "ideas"
JOIN "category" on "ideas"."category_id" = "category"."id"
WHERE user_id=2
 ORDER BY "date" ASC;
 
 SELECT * FROM ideas WHERE user_id=2;
 