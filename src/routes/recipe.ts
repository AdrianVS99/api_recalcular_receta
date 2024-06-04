import express from 'express';

interface Recipe {
    name: string;
    ingredients: Ingredient[];
    serves: number;
}

interface Ingredient {
    name: string;
    quantity: number;
}

const router = express.Router();

router.get('/', (_req, res) => {
    res.send('Here are the recipes');
}
);

router.post('/', (req, res) => {
    const recipe: Recipe = req.body;
    const people: number = Number(req.query.people);

    if (isNaN(people) || people <= 0) {
        return res.status(400).send('Invalid number of people');
    }

    if (isNaN(recipe.serves) || recipe.serves <= 0) {
        return res.status(400).send('Invalid number of serves in the recipe');
    }

    const updatedRecipe: Recipe = {
        name: recipe.name,
        serves: people,
        ingredients: recipe.ingredients.map(ingredient => ({
            name: ingredient.name,
            quantity: (ingredient.quantity / recipe.serves) * people
        }))
    };

    return res.json(updatedRecipe);
});

export default router;