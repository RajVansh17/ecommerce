import { useParams } from "react-router-dom"


export const ProductDetails = () => {
    const {id} =useParams();

    return (
    <div>
        <p>product id {id}</p>
    </div>
  )
}
