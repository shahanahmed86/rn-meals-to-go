import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Searchbar, ActivityIndicator, Colors } from 'react-native-paper';
import { Spacer } from '../../../components';
import { restaurantContext } from '../../../context';

import { RestaurantInfoCard } from '../components';
import { SafeArea, SearchContainer, RestaurantList, LoaderComponent } from './restaurant.styles';
import { useDebounce } from '../../../hooks';
import { locationRequest } from '../../../services/location/location.service';

const { withRestaurantContext, actions } = restaurantContext;
function RestaurantsScreen({ restaurantStore, restaurantDispatch }) {
  const { restaurants, searchText, isLoading, error } = restaurantStore;
  const handleSearch = text => restaurantDispatch({ type: actions.SEARCH_RESTAURANTS, payload: text });

  const debouncedSearchText = useDebounce(searchText, 1500);

  useEffect(() => {
    if (debouncedSearchText) {
      locationRequest(debouncedSearchText)
        .then(() => console.log('success'))
        .catch(() => console.log('error'));
    }
  }, [debouncedSearchText]);
  return (
    <SafeArea>
      {isLoading ? (
        <LoaderComponent>
          <ActivityIndicator size="large" color={Colors.blue300} />
        </LoaderComponent>
      ) : (
        <Fragment>
          <SearchContainer>
            <Searchbar placeholder="Search restaurants..." onChangeText={handleSearch} value={searchText} />
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
        </Fragment>
      )}
    </SafeArea>
  );
}

RestaurantsScreen.propTypes = {
  restaurantStore: PropTypes.shape({
    restaurants: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }),
  restaurantDispatch: PropTypes.func.isRequired,
};

export default withRestaurantContext(RestaurantsScreen);
