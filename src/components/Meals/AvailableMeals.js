import { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);

  const url =
    'https://react-http-4bc80-default-rtdb.firebaseio.com/availableMeals.json';

  const fetchMeals = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();

    const dataKeys = Object.keys(data);
    const fetchedMeals = [];

    for (const key of dataKeys) {
      const meal = {
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      };
      fetchedMeals.push(meal);
    }

    setAvailableMeals(fetchedMeals);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = availableMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
