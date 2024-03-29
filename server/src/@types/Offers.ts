import { Request } from "express";
import { Authorized, OptionalAuthorized } from "./authenticate";
//
//
export type OfferStatus = "DEFAULT" | "SOLD" | "BANNED" | "HIDDEN";
export type OfferCategory = "services" | "automotive" | "education" | "sport" | "fashion" | "electronic" | "real-estate" | "job" | "house-and-garden";
interface GetAll_QUERY {
    limit: number | undefined;
    page: number | undefined;
    category: undefined | OfferCategory;
    order: undefined | "oldest" | "cheapest" | "most-expensive";
    search: undefined | string;
}
export type GetAllRequest = Request<{}, {}, {}, GetAll_QUERY>;
//
//
//
export type GetSingleRequest = OptionalAuthorized & Request<{ slug: string }>;
//
//
//
interface CreateBody {
    title: string;
    category: OfferCategory;
    description: string;
    price: number;
    contact: string;
    photos: string;
    country: string;
    currency: string;
    localization: string;
    advantages: string;
}
export type CreateRequest = Authorized & Request<{}, {}, CreateBody>;
export type DeleteRequest = Authorized & Request<{ id: number }>;
export type FollowRequest = Authorized & Request<{ id: number }>;
export type RecommendationsRequest = Request<{ slug: string }>;
export type OwnedOffersRequest = Authorized & Request<{ id: number }>;
export type ChangeStatusRequest = Authorized & Request<{ id: number }, {}, { status: OfferStatus }>;

//
//
//
export interface OfferSchema {
    id?: any;
    title?: string;
    slug?: string;
    category?: OfferCategory;
    description?: string;
    price?: number;
    valueInUSD?: number;
    contact?: string[];
    photos?: string[];
    localization?: string;
    folder?: string;
    updatedAt?: string;
    advantages?: string;
    currency?: "PLN" | "EUR" | "USD" | "GBP";
    country?: string;
    creator_id: any;
    creator?: {
        id?: any;
        name?: string;
        surname?: string;
        email?: string;
        role?: string;
        avatar?: string | null;
        createdAt?: string;
        reviews_about_self?: {
            explanation?: string;
            score?: number;
            updatedAt?: string;
        }[];
    };
    follows?: {
        user_id?: any;
        offer_id?: any;
    }[];
}
