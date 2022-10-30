import { Router } from 'express'
import { UserController } from '@/presentation/controllers'
import { celebrate, Joi } from 'celebrate'

const userController = new UserController()

export default (router: Router): void => {
	router.get(
		`/users/:username/details`,
		celebrate({
			params: {
				username: Joi.string()
					.regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
					.required(),
			},
		}),
		userController.details,
	)

	router.get(
		'/users/',
		celebrate({
			query: {
				per_page: Joi.number().optional().default(10).min(1),
				since: Joi.number().optional().default(0).min(0),
			},
		}),
		userController.index,
	)
}
