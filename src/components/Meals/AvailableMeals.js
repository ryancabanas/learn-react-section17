import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-4bc80-default-rtdb.firebaseio.com/availableMeals.json'
      );

      if (!response.ok) throw new Error('Something went wrong.');

      const data = await response.json();

      const fetchedMeals = [];

      for (const key in data) {
        const meal = {
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        };
        fetchedMeals.push(meal);
      }

      setAvailableMeals(fetchedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealsList = availableMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content;
  if (mealsList.length === 0) content = <p>No meals found.</p>;
  if (mealsList.length > 0) content = <ul>{mealsList}</ul>;
  if (isLoading) content = <p>Loading...</p>;
  if (httpError) content = <p>{httpError}</p>;

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
