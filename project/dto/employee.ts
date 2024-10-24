export type GetOne = {
    id  :string,
}

export type CreateOne = {
    firstname   :string,
    lastname    :string,
    username    :string,
    email       :string,
    location?   :string,
    managerId?  :string,
    companyId?  :string,
}

export type UpdateOne = {
    id          :string,
    firstname   :string,
    lastname    :string,
    username    :string,
    email       :string,
    location?   :string,
    managerId?  :string,
}

export type DeleteOne = {
    id  :string,
}