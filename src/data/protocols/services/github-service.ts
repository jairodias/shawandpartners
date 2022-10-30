import {
	GithubListUsersDTO,
	ListUsersDTO,
	ResponseListUsersDTO,
	ResponseUserRepositoriesDTO,
	UserDetailsDTO,
	UserRepositoriesDTO,
} from '@/data/protocols/dto'

export interface IGithubService {
	listUsers: (data: ListUsersDTO) => Promise<ResponseListUsersDTO>
	getUserByUsername: (
		data: UserDetailsDTO,
	) => Promise<GithubListUsersDTO>
	getRepositoriesByUsername: (
		data: UserRepositoriesDTO,
	) => Promise<ResponseUserRepositoriesDTO[]>
}
