export interface ProductI{
    id: Number;
    name: String;
    price: Number;
    description: String;
    stars: Number;
    image: String;
}

export interface UserI{
    id?: string;
    email: string;
    password: string;
    role?: string;
}