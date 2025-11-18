import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../common/Http";

export const CartContext = createContext();

const CartContextProvider = ({children}) => {
    
    const { data: cart = [], isLoading: loadingCart } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await fetch(`${apiUrl}/cart` , {
                headers : {
                    'Content-type' : 'application/json'
                },
                credentials : 'include'
            });
            const result = await res.json();
            if(result.status === 200){
                return result.data
            }
            return [];
        },
    });
    const contextValue = {
        cart,
        loadingCart
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;