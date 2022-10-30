import { IUserService } from '@/data/protocols/services'
import { UserService } from '@/data/services'
import { container } from 'tsyringe'

export const makeUserService = (): IUserService => {
	return container.resolve(UserService)
}
