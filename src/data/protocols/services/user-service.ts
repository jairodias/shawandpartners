import { ListUsersDTO, ResponseListUsersDTO } from '@/data/protocols/dto'

export interface IUserService {
    index: (data: ListUsersDTO) => Promise<ResponseListUsersDTO>
}