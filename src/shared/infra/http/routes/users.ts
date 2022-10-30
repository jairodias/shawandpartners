import { Router } from 'express'
import { UserController } from '@/presentation/controllers'
import { celebrate, Joi } from 'celebrate'

const userController = new UserController()

export default (router: Router): void => {
	router.get(
		'/users/',
		celebrate({
			query: {
				per_page: Joi.number().optional().default(10).min(1),
				since: Joi.number().required().min(0),
			},
		}),
		userController.index,
	)
}
