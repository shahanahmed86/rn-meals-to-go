import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import PropTypes from 'prop-types';

import { RestaurantInfoCard } from '../components';
import { SafeArea } from './restaurant.styles';

function RestaurantDetails({ route }) {
  const { restaurant } = route.params;
  const [isBreakfastOpen, setIsBreakfastOpen] = useState(false);
  const [isLunchOpen, setIsLunchOpen] = useState(false);
  const [isDinnerOpen, setIsDinnerOpen] = useState(false);
  const [isDrinkOpen, setIsDrinkOpen] = useState(false);

  const toggleBreakfastOpen = () => setIsBreakfastOpen(!isBreakfastOpen);
  const toggleLunchOpen = () => setIsLunchOpen(!isLunchOpen);
  const toggleDinnerOpen = () => setIsDinnerOpen(!isDinnerOpen);
  const toggleDrinkOpen = () => setIsDrinkOpen(!isDrinkOpen);
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          expanded={isBreakfastOpen}
          onPress={toggleBreakfastOpen}
          title="Breakfast"
          left={props => <List.Icon {...props} icon="bread-slice" />}>
          <List.Item title="Eggs Benedicts" />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>

        <List.Accordion
          expanded={isLunchOpen}
          onPress={toggleLunchOpen}
          title="Lunch"
          left={props => <List.Icon {...props} icon="hamburger" />}>
          <List.Item title="Burger w/ Fries" />
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>

        <List.Accordion
          expanded={isDinnerOpen}
          onPress={toggleDinnerOpen}
          title="Dinner"
          left={props => <List.Icon {...props} icon="food-variant" />}>
          <List.Item title="Spaghetti Bolognese" />
          <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
          <List.Item title="Steak Frites" />
        </List.Accordion>

        <List.Accordion
          expanded={isDrinkOpen}
          onPress={toggleDrinkOpen}
          title="Drinks"
          left={props => <List.Icon {...props} icon="cup" />}>
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Modelo" />
          <List.Item title="Coke" />
          <List.Item title="Fanta" />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
}

RestaurantDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      restaurant: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RestaurantDetails;
