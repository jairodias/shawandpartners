import 'dotenv/config'
import env from '@/main/config/env'

import { setupApp } from '@/main/config/app'

const app = setupApp()
app.listen(env.port, () =>
	console.log(
		`Server running at ${env.application_hostname}:${env.port}`,
	),
)

export const server = app
