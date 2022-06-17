import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import PropTypes from 'prop-types';

import { RestaurantInfoCard, OrderButton } from '../components';
import { SafeArea, Spacer } from '../../../components';
import { withCartContext } from '../../../context';

function RestaurantDetails({ route, navigation, addToCart }) {
  const { restaurant } = route.params;
  const [isBreakfastOpen, setIsBreakfastOpen] = useState(false);
  const [isLunchOpen, setIsLunchOpen] = useState(false);
  const [isDinnerOpen, setIsDinnerOpen] = useState(false);
  const [isDrinkOpen, setIsDrinkOpen] = useState(false);

  const toggleBreakfastOpen = () => setIsBreakfastOpen(!isBreakfastOpen);
  const toggleLunchOpen = () => setIsLunchOpen(!isLunchOpen);
  const toggleDinnerOpen = () => setIsDinnerOpen(!isDinnerOpen);
  const toggleDrinkOpen = () => setIsDrinkOpen(!isDrinkOpen);

  const onOrderButton = () => {
    addToCart({ item: 'Special', price: 1299 }, restaurant);
    navigation.navigate('Checkout');
  };
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} showCloseIcon={true} />
      <ScrollView>
        <List.Section>
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
        </List.Section>
      </ScrollView>

      <Spacer position="bottom" size="large">
        <OrderButton onPress={onOrderButton}>Order Special only 12.99</OrderButton>
      </Spacer>
    </SafeArea>
  );
}

RestaurantDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      restaurant: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default withCartContext(RestaurantDetails);
