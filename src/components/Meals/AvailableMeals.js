import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useState, useCallback, useEffect } from 'react';

const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
];

const AvailableMeals = () => { 
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFoodsHandler = useCallback(async() => {
    setIsLoading(true);
    setError(null); 
    
    try {
      const response = await fetch('https://react-http-76bce-default-rtdb.firebaseio.com/foods.json')
      
      if(!response.ok) {
        throw new Error('something went wrong!');
      }
      
      const data = await response.json();
      const loadedFoods = [];

      for(const key in data) {
        loadedFoods.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price
        })
      }
      console.log(data);
      
      setFoods(loadedFoods); 
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchFoodsHandler();
  }, [fetchFoodsHandler]);

  const mealsList = foods.map(meal => 
    <MealItem 
      id={meal.id}
      key={meal.id} 
      name={meal.name} 
      description={meal.description}
      price={meal.price}
    />);

  return (
      <section className={classes.meals}>
          <Card>
              <ul>
                  {isLoading && <p>Loading...</p> }
                  {!isLoading && error && <p>{error}</p> }
                  {!isLoading && foods.length > 0 && mealsList}
              </ul>
          </Card>
          
      </section>
  );
};

export default AvailableMeals;