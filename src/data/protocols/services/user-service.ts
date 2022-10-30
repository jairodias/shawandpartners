import {
	GithubListUsersDTO,
	ListUsersDTO,
	ResponseListUsersDTO,
	ResponseUserRepositoriesDTO,
	UserDetailsDTO,
	UserRepositoriesDTO,
} from '@/data/protocols/dto'

export interface IUserService {
	index: (data: ListUsersDTO) => Promise<ResponseListUsersDTO>
	userDetails: (data: UserDetailsDTO) => Promise<GithubListUsersDTO>
	userRepositories: (
		data: UserRepositoriesDTO,
	) => Promise<ResponseUserRepositoriesDTO[]>
}
