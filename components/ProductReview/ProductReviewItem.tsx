import { ReviewContentFragment } from "../../generated/graphql"

interface ProductReviewItemProps {
    review: ReviewContentFragment
}

export const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  
    return (
        <li className="border mt-4 p-4 bg-white max-w-md mx-auto shadow-md rounded-md">
            <h3 className="font-bold">{review.headline}</h3>
            <p className="my-2 italic">{review.content}</p>
            <div className="text-gray-600">{review.rating}</div>
            <footer className="pt-4">{review.name}</footer>
        </li>
    )
  }