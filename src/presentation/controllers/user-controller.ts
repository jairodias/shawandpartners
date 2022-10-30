import { Request, Response } from 'express'
import { makeUserService } from '@/presentation/helpers'

export class UserController {
	async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { page, since, per_page } = request.query

		const data = await makeUserService().index({
			page: page as unknown as number,
			since: since as unknown as number,
			per_page: per_page as unknown as number,
		})

		return response.status(200).json({ data })
	}
}
