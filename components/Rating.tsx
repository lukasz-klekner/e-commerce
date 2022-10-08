interface RatingProps  {
    rating: number
  }

  export const Rating = ({ rating }: RatingProps) => {
    return (
      <div>{rating}</div>
    )
  }