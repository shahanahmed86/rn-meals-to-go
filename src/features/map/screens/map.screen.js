import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Map } from '../components/map.styles';
import { MapCallout, Search } from '../components';
import { withRestaurantContext } from '../../../context';

function MapScreen({ restaurantStore, navigation, handleSearchRestaurant }) {
  const { restaurants, location, searchText } = restaurantStore;

  const region = useMemo(() => {
    if (location) {
      const northeastLat = location.viewport.northeast.lat;
      const southwestLat = location.viewport.southwest.lat;

      return {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: northeastLat - southwestLat,
        longitudeDelta: 0.2,
      };
    }
  }, [location]);
  return (
    <Fragment>
      <Search search={searchText} handleSearch={handleSearchRestaurant} />
      <Map region={region} provider={PROVIDER_GOOGLE}>
        {location &&
          restaurants.map((restaurant, i) => {
            const coordinate = {
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            };
            return (
              <MapView.Marker key={`${restaurant.name}-${i}`} title={restaurant.name} coordinate={coordinate}>
                <MapView.Callout onPress={() => navigation.navigate('RestaurantDetails', { restaurant })}>
                  <MapCallout restaurant={restaurant} />
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
      </Map>
    </Fragment>
  );
}

MapScreen.propTypes = {
  restaurantStore: PropTypes.shape({
    restaurants: PropTypes.array.isRequired,
    location: PropTypes.object,
    searchText: PropTypes.string.isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  handleSearchRestaurant: PropTypes.func.isRequired,
};

export default withRestaurantContext(MapScreen);
