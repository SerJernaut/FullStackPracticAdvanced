UPDATE "Users"
SET balance=balance+"SpecificUserPrizes".sum * 0.1
FROM (SELECT "Users".id, sum(prize) FROM "Users" JOIN "Contests" C ON "Users".id = C."userId"
      WHERE "createdAt" BETWEEN '2019-12-25' AND '2020-01-14'
      GROUP BY "Users".id) AS "SpecificUserPrizes"
WHERE "Users".id="SpecificUserPrizes".id