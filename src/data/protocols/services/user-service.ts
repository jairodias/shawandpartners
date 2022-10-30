import {
	GithubListUsersDTO,
	ListUsersDTO,
	ResponseListUsersDTO,
	UserDetailsDTO,
} from '@/data/protocols/dto'

export interface IUserService {
	index: (data: ListUsersDTO) => Promise<ResponseListUsersDTO>
	userDetails: (data: UserDetailsDTO) => Promise<GithubListUsersDTO>
}
