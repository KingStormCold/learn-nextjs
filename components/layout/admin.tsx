import { useAuth } from '@/hooks/use-auth';
import { LayoutProps } from '@/models/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Auth } from '../common';

export function AdminLayout ({children}: LayoutProps) {

  const {profile, logout} = useAuth()
  const router = useRouter()

  async function handleLogoutClick() {
    try {
        await logout();
        console.log('redirect to logout page')
        router.push('/login')
    } catch(error) {
        console.log('failed to logout', error)
    }
  }
  return (
    <Auth>
      <div>
        <h1>Admin layout</h1>
        <p>Profile: {JSON.stringify(profile)}</p>
        <button onClick={handleLogoutClick}>Logout</button>
        <Link href="/" legacyBehavior>
          <a>Home</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a>About</a>
        </Link>
        <div>
          {children}
        </div>
      </div>
    </Auth>
  );
}
