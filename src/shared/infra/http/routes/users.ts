import { Router } from 'express'
import { UserController } from '@/presentation/controllers'
import { celebrate, Joi } from 'celebrate'

const userController = new UserController()

export default (router: Router): void => {
	router.get(
		'/users/',
		celebrate({
			query: {
				page: Joi.number().optional().default(1),
				per_page: Joi.number().optional().default(10),
				since: Joi.number().required(),
			},
		}),
		userController.index,
	)
}
