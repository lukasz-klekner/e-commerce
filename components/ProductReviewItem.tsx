import { ReviewContentFragment } from "../generated/graphql"

interface ProductReviewItemProps {
    review: ReviewContentFragment
}

export const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  
    return (
        <li>
            <h3>{review.content}</h3>
            <p>{review.content}</p>
            <div>{review.rating}</div>
            <footer>{review.name}</footer>
        </li>
    )
  }