import { inject, injectable } from 'tsyringe'
import {
	GithubListUsersDTO,
	ListUsersDTO,
	ResponseListUsersDTO,
	UserDetailsDTO,
} from '@/data/protocols/dto'
import {
	IGithubService,
	IUserService,
} from '@/data/protocols/services'
import { AppError } from '@/shared/errors'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject('GithubService')
		private readonly githubService: IGithubService,
	) {}

	async index(data: ListUsersDTO): Promise<ResponseListUsersDTO> {
		return this.githubService.listUsers(data)
	}

	async userDetails(
		data: UserDetailsDTO,
	): Promise<GithubListUsersDTO> {
		return this.githubService.getUserByUsername(data)
	}
}
