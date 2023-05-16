import useSWR from 'swr'
import { PublicConfiguration } from 'swr/_internal'
import { authApi } from '../api-client'

export function useAuth(options?: Partial<PublicConfiguration>) {
  //profile, nhiệm vụ là quản lý profile, sử dụng bất cứ nơi nào mà sử dụng profile thì gọi thằng useAuth này
  //Đối với profile thì rất ít thay đổi, nếu ng dùng thay đổi thì mình có thể dùng thằng mutate để mình revalidate, nên có thể để lâu, 1h hay nhiêu cũng dc
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
  })

  const firstLoading = profile === undefined && error === undefined

  async function login() {
    await authApi.login({
      username: 'test1',
      password: '123123',
    })

    await mutate()
  }

  async function logout() {
    await authApi.logout()
    mutate({}, false)
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
  }
}
