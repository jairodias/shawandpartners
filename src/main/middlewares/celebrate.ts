import { CelebrateError, errors } from 'celebrate'

export const celebrateErrors = errors()

export const customErrors = (error: CelebrateError) => {
    const result: {
        error: 'VALIDATION_ERROR',
        messages: string[],
    } = {
        error: 'VALIDATION_ERROR',
        messages: [],
    }
    for (const [_, joiError] of error.details.entries()) {
        result.messages = joiError.details.map((err) => {
            return err.message.replace(/"/g, "")
        })
    }

    return result
}