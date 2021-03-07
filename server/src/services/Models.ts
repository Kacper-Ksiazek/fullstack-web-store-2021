import path from "path";
//
const { User: u, Offer: o, Review: r } = require(path.join(__dirname, "..", "sequelize", "models", "index"));
//
export const User = u;
export const Offer = o;
export const Review = r;
