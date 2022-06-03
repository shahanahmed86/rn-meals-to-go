import React from 'react';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';

import star from '../../../../assets/star';
import open from '../../../../assets/open';
import { Spacer, Text } from '../../../components';
import { Info, Icon, Ratings, RestaurantCard, Section, SectionEnd } from './restaurant-info-card.styles';

function RestaurantInfoCard({ restaurant, showCloseIcon }) {
  const { name, icon, photos, address, isOpenNow, rating, isClosedTemporarily, placeId } = restaurant;

  const ratingArray = new Array(Math.floor(rating)).fill(0);
  return (
    <RestaurantCard elevation={5}>
      <RestaurantCard.Cover source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        {ratingArray.length && (
          <Section>
            <Ratings>
              {ratingArray.map((_, i) => (
                <SvgXml key={`start-${placeId}-${i}`} xml={star} width={20} height={20} />
              ))}
            </Ratings>
            <SectionEnd>
              {isClosedTemporarily && <Text variant="error">CLOSED TEMPORARILY</Text>}
              {isOpenNow && (
                <Spacer position="left" size="large">
                  <SvgXml xml={open} width={20} height={20} />
                </Spacer>
              )}
              <Spacer position="left" size="large">
                <Icon source={{ uri: icon }} />
              </Spacer>
            </SectionEnd>
          </Section>
        )}
        <Text variant="caption">{address}</Text>
      </Info>
    </RestaurantCard>
  );
}

RestaurantInfoCard.defaultProps = {
  restaurant: {
    name: 'Some Restaurant',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    photos: [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ],
    address: '100 some random street',
    isOpenNow: true,
    rating: 4,
    isClosedTemporarily: true,
  },
  showCloseIcon: false,
};

RestaurantInfoCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    address: PropTypes.string,
    isOpenNow: PropTypes.bool,
    rating: PropTypes.number,
    isClosedTemporarily: PropTypes.bool,
  }).isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
};

export default RestaurantInfoCard;
