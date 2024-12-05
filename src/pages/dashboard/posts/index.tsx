import React, { useEffect } from 'react'
import DashboardLayout from '../layout'
import TablePost from '@/components/TablePost'
import { message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import router from 'next/router';
import UriPath from '@/pages/utils/uri_path.enum';
import { getPosts } from '@/pages/api';
import useStorePost from '@/store/posts';
import CreatePostModal from '@/components/CreatePostModal';
import { useQuery } from '@tanstack/react-query';
import { useCreatePost } from '@/hooks/posts/useCreatePost';
import { useDeletePost } from '@/hooks/posts/useDeletePost';
import { useViewPost } from '@/hooks/posts/useViewPost';
import EditPostDrawer from '@/components/EditPostDrawer';
import { Posts, UpdatePost } from '@/types';
import { useUpdatePost } from '@/hooks/posts/userUpdatePost';


export default function index() {

  const { all_posts, setAllPosts, modal_edit_post, setModalEditPost, title, setTitle, body, setBody, setDrawerEditPost, drawer_edit_post, setId, setUserId, setPost } = useStorePost();
  const { mutate: createPost } = useCreatePost();
  const { mutate: deletePost, isPending: isDeletingPost } = useDeletePost();
  const { mutate: viewPost } = useViewPost()
  const { mutate: updatePost } = useUpdatePost()
  const { data: posts, isLoading: isFetching, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Invalid credentials!");
      }
      return getPosts(token);
    }
  })

  const handleCreatePost = async () => {
    createPost({ title, body },
      {
        onSuccess: () => {
          handleToggleCreateModal();
          setTitle("");
          setBody("");
        },
      }
    )
  }

  const handleDeletePost = async (post_id: number) => {
    deletePost(post_id)
  }

  const handleViewPost = async (post_id: number) => {
    viewPost(post_id, {
      onSuccess: () => {
        message.success("Post view successfully!");
        router.push(`${UriPath.DASHBOARD_POSTS}/${post_id}`);
      }
    })
  }

  const handleToggleCreateModal = () => {
    setModalEditPost(!modal_edit_post)
  }

  const handleToggleEditDrawer = (post_id: number) => {
    setId(post_id)
    viewPost(post_id, {
      onSuccess: () => {
        setDrawerEditPost(!drawer_edit_post)
      }
    })
  }

  const handleUpdateUser = async (post_data: UpdatePost, post_id: number) => {
    const updatedPostData: { post_data: UpdatePost; post_id: number } = {
      post_data,
      post_id,
    };

    updatePost(updatedPostData, {
      onSuccess: () => {
        setDrawerEditPost(!drawer_edit_post)
        setTitle("")
        setBody("")
        setUserId(0)
        setId(0)
        setPost(null as unknown as Posts);
      }
    })
  };

  useEffect(() => {
    if (posts) setAllPosts(posts);
    if (isError && error instanceof Error) {
      message.error(error.message);
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      router.push(UriPath.PAGE);
    }
  }, [posts, isError, error, setAllPosts]);

  return (
    <DashboardLayout title='Posts'>
      <div className="space-y-5 relative min-h-screen">
        <CreatePostModal open={modal_edit_post} onClose={handleToggleCreateModal} title={title} setTitle={setTitle} body={body} setBody={setBody} onSubmit={handleCreatePost} />

        <EditPostDrawer open={drawer_edit_post} onClose={() => setDrawerEditPost(!drawer_edit_post)} onSumbit={handleUpdateUser} />

        {
          isFetching || isDeletingPost ? (
            <div className="glassmorphism-container">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#4A90E2" }} spin />} />
            </div>
          ) : (
            <TablePost data={all_posts} onDeletePost={handleDeletePost} onViewPost={handleViewPost} handleToggleCreateModal={handleToggleCreateModal} handleToggleEditDrawer={handleToggleEditDrawer} />
          )
        }
      </div>
    </DashboardLayout>
  )
}
