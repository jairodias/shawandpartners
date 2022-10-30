import { IGithubService } from '@/data/protocols/services'
import {
	ListUsersDTO,
	ResponseListUsersDTO,
} from '@/data/protocols/dto'
import axios from 'axios'
import env from '@/main/config/env'

export class GithubService implements IGithubService {
	async listUsers({
		page,
		per_page,
		since,
	}: ListUsersDTO): Promise<ResponseListUsersDTO> {
		console.log(
			`${env.api_github_url}/users?per_page=${per_page}&since=${since}`,
		)
		const { data } = await axios.get(
			`${env.api_github_url}/users?per_page=${per_page}&since=${since}`,
		)

		const next = `${
			env.api_github_url
		}/users?per_page=${per_page}&since=${since + per_page}`

		return {
			next,
			items: data,
		}
	}
}
