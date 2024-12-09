import React, { useEffect } from 'react'
import { message, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import DashboardLayout from '../layout'
import TableUser from '@/components/TableUser'
import CreateUserModal from '@/components/CreateUserModal';
import { getUsers } from '@/pages/api';
import { useQuery } from '@tanstack/react-query';
import router from 'next/router';
import useUserStore from '@/store/users';
import UriPath from '@/utils/uri_path.enum';
import { useCreateUser } from '@/hooks/users/useCreateUser'
import { useDeleteUser } from '@/hooks/users/useDeleteUser';
import { useViewUser } from '@/hooks/users/useViewUser';
import { useUpdateUser } from '@/hooks/users/useUpdateUser';
import EditUserDrawer from '@/components/EditUserDrawer';
import { UpdateUser } from '@/types';
import DeleteModal from '@/components/DeleteModal';

export default function index() {
  const { all_users, setAllUsers, setModalCreateUser, modal_create_user, name, setName, email_address, setEmailAddress, gender, setGender, setStatus, status, setDrawerEditUser, drawer_edit_user, setId, id, modal_delete_user, setModalDeleteUser } = useUserStore();
  const { mutate: createUser } = useCreateUser();
  const { mutate: deleteUser, isPending: isDeletingUser } = useDeleteUser();
  const { mutate: viewUser } = useViewUser();
  const { mutate: updateUser } = useUpdateUser()
  const { data: users, isLoading: isFetching, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Invalid credentials!");
      }
      return getUsers(token);
    }
  })

  const handleCreateUser = async () => {
    createUser({ name, email: email_address, gender, status },
      {
        onSuccess: () => {
          handleToggleCreateModal();
          setName("");
          setEmailAddress("");
          setGender("");
        },
      },
    )
  }

  const handleDeleteUser = async () => deleteUser(id, {
    onSuccess: () => {
      setModalDeleteUser(false)
      setId(0);
    }
  })

  const handleToggleDeleteModal = (user_id: number) => {
    setModalDeleteUser(!modal_delete_user)
    setId(user_id)
  }

  const handleViewUser = async (user_id: number) => {
    viewUser(user_id, {
      onSuccess: () => {
        message.success("User view successfully!");
        router.push(`${UriPath.DASHBOARD_USERS}/${user_id}`);
      }
    })
  }

  const handleToggleCreateModal = () => setModalCreateUser(!modal_create_user)

  const handleToggleDrawerEdit = (user_id: number) => {
    setId(user_id)
    viewUser(user_id, {
      onSuccess: () => {
        setDrawerEditUser(!drawer_edit_user)
      }
    })
  }

  const handleUpdateUser = async (user_data: UpdateUser, user_id: number) => {
    const updatedUserData: { user_data: UpdateUser; user_id: number } = {
      user_data,
      user_id,
    };
    updateUser(updatedUserData, {
      onSuccess: () => {
        setDrawerEditUser(!drawer_edit_user)
        setName("");
        setEmailAddress("");
        setGender("");
      }
    });
  };

  const handleSwitchStatusUser = (e: boolean) => {
    if (e) setStatus('active')
    if (!e) setStatus('inactive')
  }

  useEffect(() => {
    if (users) {
      setAllUsers(users);
    }
    if (isError && error instanceof Error) {
      message.error(error.message);
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      router.push(UriPath.PAGE);
    }
  }, [users, isError, error, setAllUsers]);

  return (
    <DashboardLayout title='Users'>
      <div className="space-y-5 min-h-screen">
        <CreateUserModal open={modal_create_user} onCancel={handleToggleCreateModal} onSubmit={handleCreateUser} name={name} setName={setName} email_address={email_address} setEmailAddress={setEmailAddress} gender={gender} setGender={setGender} handleSwitchStatusUser={handleSwitchStatusUser} />

        <DeleteModal open={modal_delete_user} onCancel={() => setModalDeleteUser(false)} onSubmit={handleDeleteUser} data='user' />

        <EditUserDrawer open={drawer_edit_user} onClose={() => setDrawerEditUser(!drawer_edit_user)} onSumbit={handleUpdateUser} />

        {
          isFetching || isDeletingUser ? (
            <div className="glassmorphism-container">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#4A90E2" }} spin />} />
            </div>
          ) : (
            <TableUser data={all_users} onDeleteUser={handleToggleDeleteModal} onViewUser={handleViewUser} onEditUser={handleToggleDrawerEdit} handleToggleCreateModal={handleToggleCreateModal} />
          )
        }
      </div>
    </DashboardLayout>
  )
}