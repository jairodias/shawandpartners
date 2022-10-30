import { IGithubService } from '@/data/protocols/services'
import {
	GithubListUsersDTO,
	ListUsersDTO,
	ResponseListUsersDTO,
	UserDetailsDTO,
} from '@/data/protocols/dto'
import axios from 'axios'
import env from '@/main/config/env'
import { AppError } from '@/shared/errors'

export class GithubService implements IGithubService {
	async listUsers({
		per_page,
		since,
	}: ListUsersDTO): Promise<ResponseListUsersDTO> {
		try {
			const { data } = await axios.get(
				`${env.api_github_url}/users?per_page=${per_page}&since=${since}`,
			)

			const next = `${
				env.api_github_url
			}/users?per_page=${per_page}&since=${since + per_page}`

			return {
				next,
				has_more: data.length === 0 ? false : true,
				items: data,
			}
		} catch (error) {
			throw new AppError({
				message: error.message,
				statusCode: error.response.status,
				error,
			})
		}
	}

	async getUserByUsername({
		username,
	}: UserDetailsDTO): Promise<GithubListUsersDTO> {
		try {
			const { data } = await axios.get(
				`${env.api_github_url}/users/${username}`,
			)

			return data
		} catch (error) {
			throw new AppError({
				message:
					error.response.status === 404
						? "User doesn't exists."
						: error.message,
				statusCode: error.response.status,
				error,
			})
		}
	}
}
