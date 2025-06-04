import { useNavigate } from "react-router-dom";

const useNavigateToProduct = () => {
    const navigate = useNavigate();
    
    const goToProduct = (id: string) => {
        navigate(`/product/${id}`);
    };

    return goToProduct;
};

export default useNavigateToProduct;