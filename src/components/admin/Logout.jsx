import React, { useContext } from 'react'
import { apiUrl } from '../common/Http'
import { AdminAuthContext } from '../context/AdminAuth';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const logout = async () => {
        const res = await fetch(`${apiUrl}/logout` , {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            credentials : 'include'
        });

        if(res.ok){
            queryClient.setQueryData(['user'] , null);
            queryClient.invalidateQueries(['user']);
            navigate('/login');
        }
    }
    return logout;
}
