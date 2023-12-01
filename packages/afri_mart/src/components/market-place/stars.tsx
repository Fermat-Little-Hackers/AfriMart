import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import the star icons from react-icons

interface StarsProps {
  amount: number;
}

const Stars: React.FC<StarsProps> = ({ amount }) => {
  const maxStars = 5;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= amount) {
        // Render a filled star
        stars.push(<FaStar key={i} className="text-orange-600" />);
      } else if (i - 0.5 === amount) {
        // Render a half-filled star
        stars.push(<FaStarHalfAlt key={i} className="text-orange-600"/>);
      } else {
        // Render an empty star
        stars.push(<FaStar key={i} className="text-white " />);
      }
    }

    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default Stars;
