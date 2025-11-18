import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../common/Http";
import { useQuery } from "@tanstack/react-query";

export const AdminAuthContext = createContext();

const AdminAuthContextProvider = ({ children }) => {
    const fetchUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/me`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            const result = await res.json();
            if (result.status == 200) {
                return result.user;
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    const { data: user = null, isLoading: loadingUser } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        retry : false
    });
    const contextValue = {
        user,
        loadingUser
    }
    return (
        <AdminAuthContext.Provider value={contextValue}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export default AdminAuthContextProvider;