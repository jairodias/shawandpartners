import { AppError } from '@/shared/errors'
import { isCelebrateError } from 'celebrate'
import {
	Express,
	Router,
	Request,
	Response,
	NextFunction,
} from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'
import { customErrors } from '@/main/middlewares'

export default (app: Express): void => {
	const router = Router()
	app.use('/api', router)

	readdirSync(
		join(process.cwd(), 'src/shared/infra/http/routes'),
	).map(async (file) => {
		if (!file.endsWith('.map')) {
			;(await import(`@/shared/infra/http/routes/${file}`)).default(
				router,
			)
		}
	})

	app.use(
		(
			error: Error,
			__: Request,
			response: Response,
			_: NextFunction,
		) => {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({
					error: 'APP_ERROR',
					message: error.message,
					stack: error.stack,
				})
			}

			if (!isCelebrateError(error)) {
				return response.status(500).json({
					error: 'INTERNAL_SERVER_ERROR',
					message: 'Internal server error',
					stack: process.env.DEBUG ? error.stack : null,
				})
			}

			return response.status(400).json({
				...customErrors(error),
			})
		},
	)
}
