import Cookie from 'js-cookie'
const tokenKey = 'token'

export const getToken = () => {
	return Cookie.get(tokenKey)
}

export const removeToken = () => {
	Cookie.remove(tokenKey)
}

export const setToken = (token: string) => {
	Cookie.set(tokenKey, token)
}
