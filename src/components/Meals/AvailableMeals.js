import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const url =
    'https://react-http-4bc80-default-rtdb.firebaseio.com/availableMeals.json';

  useEffect(() => {
    const fetchMeals = async () => {
      try {
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
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchMeals();
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
  if (error) content = <p>Error loading meals.</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
