import { jest, expect, test, describe } from '@jest/globals'
import { randomUUID } from 'crypto'
import superTest from 'supertest'
import { server } from '../../src/shared/infra/http/server'

jest.setTimeout(30000)

describe('API E2E Test Suite', () => {
	test('GET / - should return an error, because since not positive number', async () => {
		const response = await superTest(server).get(
			'/api/users/?since=-1',
		)
		expect(400).toBe(response.statusCode)

		const [message] = response.body.messages
		const error = response.body.error

		expect(message).toEqual(
			'since must be greater than or equal to 0',
		)
		expect(error).toEqual('VALIDATION_ERROR')
	})

	test('GET / - should return an array with users detail, if since is positive number', async () => {
		const response = await superTest(server).get(
			'/api/users/?since=0',
		)

		expect(response.statusCode).toEqual(200)

		const { items } = response.body.data

		const [user] = items
		const userExpected = {
			login: 'mojombo',
			id: 1,
			node_id: 'MDQ6VXNlcjE=',
			avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
			gravatar_id: '',
			url: 'https://api.github.com/users/mojombo',
			html_url: 'https://github.com/mojombo',
			followers_url: 'https://api.github.com/users/mojombo/followers',
			following_url:
				'https://api.github.com/users/mojombo/following{/other_user}',
			gists_url:
				'https://api.github.com/users/mojombo/gists{/gist_id}',
			starred_url:
				'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
			subscriptions_url:
				'https://api.github.com/users/mojombo/subscriptions',
			organizations_url: 'https://api.github.com/users/mojombo/orgs',
			repos_url: 'https://api.github.com/users/mojombo/repos',
			events_url:
				'https://api.github.com/users/mojombo/events{/privacy}',
			received_events_url:
				'https://api.github.com/users/mojombo/received_events',
			type: 'User',
			site_admin: false,
		}

		expect(userExpected).toEqual(user)
	})

	test('GET / - should return an array with 10 users detail, if per_page not provided', async () => {
		const response = await superTest(server).get(
			'/api/users/?since=0',
		)

		expect(response.statusCode).toEqual(200)

		const { items } = response.body.data

		expect(items.length).toEqual(10)
	})

	test('GET / - should return an array with 20 users detail, if per_page provided is equal 20', async () => {
		const response = await superTest(server).get(
			'/api/users/?since=0&per_page=20',
		)

		expect(response.statusCode).toEqual(200)

		const { items } = response.body.data

		expect(items.length).toEqual(20)
	})

	test('GET /:username/details - should return an error, if username provided is invalid', async () => {
		const invalid_username = '_jairodias_'
		const response = await superTest(server).get(
			`/api/users/${invalid_username}/details`,
		)

		expect(400).toBe(response.statusCode)

		const [message] = response.body.messages
		const error = response.body.error

		expect(message).toEqual(
			'username with value _jairodias_ fails to match the required pattern: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/',
		)
		expect(error).toEqual('VALIDATION_ERROR')
	})

	test("GET /:username/details - should return an object empty if username doesn't exists", async () => {
		const username_not_exist = randomUUID()
		const response = await superTest(server).get(
			`/api/users/${username_not_exist}/details`,
		)
		expect(404).toBe(response.statusCode)

		const { error, message } = response.body
		expect(error).toEqual('APP_ERROR')
		expect(message).toEqual("User doesn't exists.")
	})

	test('GET /:username/details - should return an object with user detail', async () => {
		const valid_username = 'jairodias'
		const response = await superTest(server).get(
			`/api/users/${valid_username}/details`,
		)
		expect(200).toBe(response.statusCode)

		const { data } = response.body

		const data_valid_username_provided = {
			login: 'jairodias',
			id: 51006591,
			node_id: 'MDQ6VXNlcjUxMDA2NTkx',
			avatar_url:
				'https://avatars.githubusercontent.com/u/51006591?v=4',
			gravatar_id: '',
			url: 'https://api.github.com/users/jairodias',
			html_url: 'https://github.com/jairodias',
			followers_url:
				'https://api.github.com/users/jairodias/followers',
			following_url:
				'https://api.github.com/users/jairodias/following{/other_user}',
			gists_url:
				'https://api.github.com/users/jairodias/gists{/gist_id}',
			starred_url:
				'https://api.github.com/users/jairodias/starred{/owner}{/repo}',
			subscriptions_url:
				'https://api.github.com/users/jairodias/subscriptions',
			organizations_url:
				'https://api.github.com/users/jairodias/orgs',
			repos_url: 'https://api.github.com/users/jairodias/repos',
			events_url:
				'https://api.github.com/users/jairodias/events{/privacy}',
			received_events_url:
				'https://api.github.com/users/jairodias/received_events',
			type: 'User',
			site_admin: false,
			name: 'Jairo Dias',
			company: 'CredPago',
			blog: '',
			location: 'Brasil - Joinville/SC',
			email: null,
			hireable: null,
			bio: 'Desenvolvedor, apaixonado por tecnologia, ando desbravando tudo aquilo que o mercado tem de novo, melhorando meus aspectos negativo e aprimorando os positivos. ',
			twitter_username: null,
			public_repos: 60,
			public_gists: 0,
			followers: 16,
			following: 5,
			created_at: '2019-05-24T21:07:35Z',
			updated_at: '2022-10-15T21:16:44Z',
		}

		expect(data_valid_username_provided).toEqual(data)
	})

	test.todo(
		'GET /:username/repos - should return an error, if username provided is invalid',
	)

	test.todo(
		"GET /:username/repos - should return an error if username doesn't exists",
	)

	test.todo(
		'GET /:username/repos - should return an object with user repositories',
	)
})
