import React from 'react';
import { Searchbar } from 'react-native-paper';
import { Spacer } from '../../../components';

import { RestaurantInfoCard } from '../components';
import { SafeArea, SearchContainer, RestaurantList } from './restaurant.styles';

function RestaurantsScreen() {
  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      <RestaurantList
        data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
        renderItem={() => (
          <Spacer position="bottom" size="medium">
            <RestaurantInfoCard />
          </Spacer>
        )}
        keyExtractor={(_, i) => i}
      />
    </SafeArea>
  );
}

export default RestaurantsScreen;
