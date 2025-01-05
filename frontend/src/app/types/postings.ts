export type Posting = {
    title: string;
    description: string;
    price: number;
    category: string;
    images_urls: Array<string>;
    url: string;
    creator: string;
    creatorUsername: string;
    isUserCreator: boolean;
    location_name: string;
    display_coordinates: DisplayCoordinates,
}

export type DisplayCoordinates = {
    latitude: number;
    longitude: number;
}

export type FilteredLocationData = {
    latitude: number;
    longitude: number;
    radius: number;
    name: string;
    locationId: string;
}

export type ExploreResponse = {
    postings: Array<Posting>;
    category_tag: string;
    search_location?: FilteredLocationData;
}

export type LocationFilter = {
    latitude: number;
    longitude: number;
    radius: number;
}

export type Applicant = {
    pfpUrl: string;
    name: string;
    username: string;
    rating: string;
    id: number;
}

export type PostingResponse = {
    data: Posting;
    postingApplicationStatus: 'requested' | 'ACCEPTED' | 'REJECTED' | null;
}