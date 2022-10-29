import { inject, injectable } from 'tsyringe'
import { ListUsersDTO, ResponseListUsersDTO } from '@/data/protocols/dto'
import { IGithubService, IUserService } from '@/data/protocols/services'

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject('GithubService')
        private readonly githubService: IGithubService
    ) { }

    async index(data: ListUsersDTO): Promise<ResponseListUsersDTO> {
        return this.githubService.listUsers(data)
    }
}