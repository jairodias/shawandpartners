/**
 * REQUEST DTO
 */

export interface ListUsersDTO {
	since: number
	per_page: number
}

export interface UserDetailsDTO {
	username: string
}
