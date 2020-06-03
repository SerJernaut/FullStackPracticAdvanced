UPDATE "Users"
SET balance = balance + 10
FROM (SELECT id from "Users"
      WHERE role = 'creator' AND rating > 0
      ORDER BY rating DESC
      LIMIT 3) AS "UsersWithBestRating"
WHERE "Users".id="UsersWithBestRating".id;