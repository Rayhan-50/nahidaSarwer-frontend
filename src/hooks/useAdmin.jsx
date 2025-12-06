import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure';
// import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email, // Only run if user email exists
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);

            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;