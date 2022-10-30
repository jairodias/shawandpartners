import { AppError } from '@/shared/errors'

export const created = (data: any) => ({
	success: true,
	data,
})

export const error = (error: Error, statusCode: number = 400) => ({
	statusCode,
	error: new AppError(error),
})
