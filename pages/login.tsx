import React from 'react'
import { authApi } from '@/api/index'
import { useAuth } from '@/hooks/index'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()

  const {profile, login, logout} = useAuth({
    revalidateOnMount: false,
  })
  async function handleLoginClick() {
    try {
        await login()
        console.log('redirect to login page')
        router.push('/about')
    } catch(error) {
        console.log('failed to login', error)
    }
  }

  async function handleGetProfileClick() {
    try {
        await profile();
        console.log('redirect to dashboard')
    } catch(error) {
        console.log('failed to get profile', error)
    }
  }

  async function handleLogoutClick() {
    try {
        await logout();
        console.log('redirect to logout page')
    } catch(error) {
        console.log('failed to logout', error)
    }
  }

  // async function handleLoginClick() {
  //   try {
  //       await authApi.login({
  //           username: 'test1',
  //           password: '123123',
  //       });
  //   } catch(error) {
  //       console.log('failed to login', error)
  //   }
  // }

  // async function handleGetProfileClick() {
  //   try {
  //       await authApi.getProfile();
  //   } catch(error) {
  //       console.log('failed to get profile', error)
  //   }
  // }

  // async function handleLogoutClick() {
  //   try {
  //       await authApi.logout();
  //   } catch(error) {
  //       console.log('failed to logout', error)
  //   }
  // }

  return (
    <div>
      <h1>Login Page</h1>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLoginClick}>Login</button>
      {/* <button onClick={handleGetProfileClick}>Get Profile</button> */}
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={() => router.push('/about')}>Go to about</button>
    </div>
  )
}
