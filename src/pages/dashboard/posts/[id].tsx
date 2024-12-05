import React, { useEffect } from 'react';
import DashboardLayout from '../layout';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { viewPost } from '@/pages/api';
import { Button, message, Spin } from 'antd';
import router from 'next/router';
import UriPath from '@/pages/utils/uri_path.enum';
import usePostStore from '@/store/posts';

export default function ViewUser() {
    const params = useParams();
    const id = params?.id;
    const { setPost } = usePostStore()
    const { data: view_post, isLoading: isFetching, isError, error } = useQuery({
        queryKey: ["view_user"],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Invalid credentials!");
            }
            return viewPost(token, parseInt(id as string));
        }
    })

    useEffect(() => {
        if (view_post) setPost(view_post);
        if (isError && error instanceof Error) {
            message.error(error.message);
            router.push('/404');
        }
    }, [view_post, isError, error, setPost]);

    return (
        <DashboardLayout title={`User Details`}>
            <div className="space-y-5 relative h-full">

                {isFetching ? (
                    <div className="glassmorphism-container">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#4A90E2" }} spin />} />
                    </div>
                ) : (
                    <>
                        <div className="space-y-5 p-7 border rounded-xl bg-[#001529] w-full">
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-3">
                                    <UserOutlined style={{ fontWeight: 'bolder', fontSize: 38, color: '#FFF' }} />
                                    <h1 className="text-2xl font-medium items-center text-neutral-200">{view_post.user_id}</h1>
                                </div>
                                <h1 className="text-2xl font-medium items-center text-neutral-200">ID {id}</h1>
                            </div>
                            <ul className="space-y-3 text-xl font-medium">
                                <li className='text-neutral-200'>{'User ID :'} {view_post.user_id}</li>
                                <li className='text-neutral-200 capitalize'>{'Title :'} {view_post.title}</li>
                                <li className='text-neutral-200 capitalize'>{'Body :'} {view_post.body}</li>
                            </ul>
                        </div>

                        <div>
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
