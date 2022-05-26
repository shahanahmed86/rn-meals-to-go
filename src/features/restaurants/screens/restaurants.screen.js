import React from 'react';
import PropTypes from 'prop-types';
import { Searchbar } from 'react-native-paper';
import { Spacer } from '../../../components';
import { withAppContext } from '../../../context/context';

import { RestaurantInfoCard } from '../components';
import { SafeArea, SearchContainer, RestaurantList } from './restaurant.styles';

function RestaurantsScreen({ restaurants, isLoading, error }) {
  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => (
          <Spacer position="bottom" size="large">
            <RestaurantInfoCard restaurant={item} />
          </Spacer>
        )}
        keyExtractor={(_, i) => i}
      />
    </SafeArea>
  );
}

RestaurantsScreen.propTypes = {
  restaurants: PropTypes.array.isRequired,
};

export default withAppContext(RestaurantsScreen);
