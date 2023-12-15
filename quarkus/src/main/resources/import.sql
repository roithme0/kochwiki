-- WITH ingredient_1 AS (
--     INSERT INTO Ingredient(id, name, brand, unit, kcal, carbs, protein, fat)
--     VALUES (nextval('Ingredient_SEQ'), 'Zutat 1', 'Marke 1', 'G', 100, 20, 10, 10)
--     RETURNING id
-- ),
-- ingredient_2 AS (
--     INSERT INTO Ingredient(id, name, brand, unit, kcal, carbs, protein, fat)
--     VALUES (nextval('Ingredient_SEQ'), 'Zutat 2', 'Marke 2', 'ML', 200, 20, 40, 40)
--     RETURNING id
-- )

-- INSERT INTO Amount(id, index, amount, ingredient_id)
-- VALUES (nextval('Amount_SEQ'), 1, 100, (SELECT id FROM ingredient_1));
-- INSERT INTO Amount(id, index, amount, ingredient_id)
-- VALUES (nextval('Amount_SEQ'), 2, 1.5, (SELECT id FROM ingredient_2));

-- INSERT INTO Step(id, index, description)
-- VALUES (nextval('Step_SEQ'), 1, 'Schritt 1');
-- INSERT INTO Step(id, index, description)
-- VALUES (nextval('Step_SEQ'), 2, 'Schritt 2');

-- INSERT INTO Recipe(id, name, servings, preptime, originName, originUrl)
-- VALUES (nextval('Recipe_SEQ'), 'Rezept 1', 2, 30, 'Herkunft 1', 'https://www.google.de');
-- INSERT INTO Recipe(id, name, servings, preptime, originName, originUrl)
-- VALUES (nextval('Recipe_SEQ'), 'Rezept 2', 4, 60, 'Herkunft 2', 'https://www.google.de');