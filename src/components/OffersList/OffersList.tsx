import PlaceCard from '../PlaceCard/PlaceCard';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
};

function OffersList({ offers, onOfferHover }: OffersListProps): JSX.Element {
  const handleMouseEnter = (id: string) => {
    onOfferHover?.(id);
  };

  const handleMouseLeave = () => {
    onOfferHover?.(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
