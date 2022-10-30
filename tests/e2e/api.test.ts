import { jest, expect, test, describe } from '@jest/globals'
import superTest from 'supertest'
import { server } from '../../src/shared/infra/http/server'

jest.setTimeout(30000)

describe('API E2E Test Suite', () => {
	test('GET / - should return an error, because since not provided', async () => {
		const response = await superTest(server).get('/api/users/')
		expect(400).toBe(response.statusCode)

		const [message] = response.body.messages
		const error = response.body.error

		expect(message).toEqual('since is required')
		expect(error).toEqual('VALIDATION_ERROR')
	})

	test.todo('GET / - should return an array with users detail')

	test.todo(
		'GET /:username/details - should return an object with user detail',
	)
	test.todo(
		'GET /:username/repos - should return an object with user repositories',
	)
})
