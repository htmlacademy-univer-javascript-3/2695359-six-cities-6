import { memo, useCallback } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onOfferHover: (offerId: string | null) => void;
};

function OffersList({ offers, onOfferHover }: OffersListProps): JSX.Element {
  const handleMouseEnter = useCallback((offerId: string) => {
    onOfferHover(offerId);
  }, [onOfferHover]);

  const handleMouseLeave = useCallback(() => {
    onOfferHover(null);
  }, [onOfferHover]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          cardType="cities"
        />
      ))}
    </div>
  );
}

export default memo(OffersList);
