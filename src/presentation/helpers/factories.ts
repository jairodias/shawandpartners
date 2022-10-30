import { UserService } from '@/data/services';
import { container } from 'tsyringe';

export const makeUserService = () => {
	return container.resolve(UserService);
};
