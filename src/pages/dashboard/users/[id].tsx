import React, { useEffect } from 'react';
import DashboardLayout from '../layout';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { viewUser } from '@/pages/api';
import { Button, message, Spin } from 'antd';
import router from 'next/router';
import useUserStore from '@/store/users';
import UriPath from '@/pages/utils/uri_path.enum';

export default function ViewUser() {
    const params = useParams();
    const id = params?.id;
    const { setUser } = useUserStore()
    const { data: view_user, isLoading: isFetching, isError, error } = useQuery({
        queryKey: ["view_user"],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Invalid credentials!");
            }
            return viewUser(token, parseInt(id as string));
        }
    })

    useEffect(() => {
        if (view_user) setUser(view_user);
        if (isError && error instanceof Error) {
            message.error(error.message);
            router.push('/404');
        }
    }, [view_user, isError, error, setUser]);

    return (
        <DashboardLayout title={`User Details`}>
            <div className="space-y-5 relative min-h-[360px]">

                {isFetching ? (
                    <div className="glassmorphism-container">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#4A90E2" }} spin />} />
                    </div>
                ) : (
                    <>
                        <div className="space-y-5 p-7 border rounded-xl bg-[#001529] w-full lg:w-[40%]">
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-3">
                                    <UserOutlined style={{ fontWeight: 'bolder', fontSize: 38, color: '#FFF' }} />
                                    <h1 className="text-2xl font-medium items-center text-neutral-200">{view_user.name}</h1>
                                </div>
                                <h1 className="text-2xl font-medium items-center text-neutral-200">ID {id}</h1>
                            </div>
                            <ul className="space-y-3 text-xl font-medium">
                                <li className='text-neutral-200'>{'Email :'} {view_user.email}</li>
                                <li className='text-neutral-200 capitalize'>{'Gender :'} {view_user.gender}</li>
                                <li className='text-neutral-200 capitalize'>{'Status User :'} {view_user.status}</li>
                            </ul>
                        </div>

                        <div className="absolute bottom-0">
                            <Button onClick={() => router.push(UriPath.DASHBOARD_USERS)} variant='link'>
                                Back
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
