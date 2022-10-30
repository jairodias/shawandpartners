import { Request, Response } from 'express'
import { makeUserService } from '@/presentation/helpers'

export class UserController {
	async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { since, per_page } = request.query

		const data = await makeUserService().index({
			since: since as unknown as number,
			per_page: per_page as unknown as number,
		})

		return response.status(200).json({ data })
	}

	async details(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { username } = request.params

		const data = await makeUserService().userDetails({ username })

		return response.status(200).json({ data })
	}

	async repositories(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { username } = request.params

		const data = await makeUserService().userRepositories({
			username,
		})

		return response.status(200).json({ data })
	}
}
