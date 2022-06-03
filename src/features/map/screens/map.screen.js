import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Map } from '../components/map.styles';
import { MapCallout, Search } from '../components';
import { restaurantContext } from '../../../context';

const { withRestaurantContext } = restaurantContext;

function MapScreen({ restaurantStore, appStore }) {
  const { restaurants, location } = restaurantStore;
  const { isAndroid } = appStore;

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
      <Search />
      <Map region={region} provider={PROVIDER_GOOGLE}>
        {location &&
          restaurants.map((restaurant, i) => {
            const coordinate = {
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            };
            return (
              <MapView.Marker key={`${restaurant.name}-${i}`} title={restaurant.name} coordinate={coordinate}>
                <MapView.Callout>
                  <MapCallout restaurant={restaurant} isAndroid={isAndroid} />
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
  }),
  appStore: PropTypes.shape({
    isAndroid: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withRestaurantContext(MapScreen);
