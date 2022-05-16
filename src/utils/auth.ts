import Cookie from 'js-cookie'
const tokenKey = 'Cookie'

export const getToken = (): string => {
	return Cookie.get(tokenKey)
}

export const removeToken = (): void => {
	Cookie.remove(tokenKey)
}

export const setToken = (token: string): void => {
	Cookie.set(tokenKey, token)
}
