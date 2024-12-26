//represents a user entity

export type User = {
    countryCode: number;
    dateOfBirth: string;
    email: string;
    emailVerified: true;
    firstName: string;
    lastName: string;
    gender: string;
    is_worker: boolean;
    pfp_url: string;
    phone: string;
    phoneVerified: boolean;
    address: Address;
}

export type Address = {
    id: number;
    address_name: string;
    city: string;
    country: string;
    state: string;
    street: string;
    zip_code: string;
    number: number;
    latitude?: number;
    longitude?: number;
}

export type Worker = {
    id: number;
    name: string;
    rating: string;
    categories: Array<string>;
    pfpUrl: string;
}

export type SVGProps = {
    width: string;
    color?: string;
};