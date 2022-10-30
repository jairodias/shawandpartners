import {
	ListUsersDTO,
	ResponseListUsersDTO,
} from '@/data/protocols/dto'

export interface IGithubService {
	listUsers: (data: ListUsersDTO) => Promise<ResponseListUsersDTO>
}
