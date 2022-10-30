import {
	GithubListUsersDTO,
	ListUsersDTO,
	ResponseListUsersDTO,
	UserDetailsDTO,
} from '@/data/protocols/dto'

export interface IGithubService {
	listUsers: (data: ListUsersDTO) => Promise<ResponseListUsersDTO>
	getUserByUsername: (
		data: UserDetailsDTO,
	) => Promise<GithubListUsersDTO>
}
