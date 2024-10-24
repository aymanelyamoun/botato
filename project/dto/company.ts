export type CreateOne = {
    name        :string,
    location?   :string
}

export type DeleteOne = {
    id  :string,
}

export type UpdateOne = {
    id      :string,
    name    :string,
    location:string
}

export type GetEmployees = {
    id  :string,
}