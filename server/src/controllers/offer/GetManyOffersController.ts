import { Response } from "express";
import { Op } from "sequelize";
//
import { GetAllRequest } from "../../@types/Offers";
import { Offer, User, Follow } from "../../services/Models";
import { OFFERS_PER_PAGE } from "../../config/config";
//
class GetManyOffersController {
    protected req: GetAllRequest;
    protected excludes = {
        fromOffer: ["createdAt", "creator_id", "advantages"],
        fromCreator: ["createdAt", "updatedAt", "tokens", "password", "contact", "email"],
        fromFollows: ["createdAt", "updatedAt", "offer_id"],
    };
    //
    // helpers
    //
    protected generateOrderClause() {
        return {
            order: (() => {
                switch (this.req.query.order) {
                    case "oldest":
                        return [["id", "ASC"]];
                    case "most-expensive":
                        return [["valueInUSD", "DESC"]];
                    case "cheapest":
                        return [["valueInUSD", "ASC"]];
                    default:
                        return [["id", "DESC"]];
                }
            })(),
        };
    }
    protected generateWhereClause() {
        return {
            where: (() => {
                const { category, search } = this.req.query;
                const where = {
                    status: "DEFAULT",
                    category: category,
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${search}%` } },
                        { description: { [Op.iLike]: `%${search}%` } },
                        { localization: { [Op.iLike]: `%${search}%` } }, //
                    ],
                };
                //
                if (category === undefined) delete where.category;
                if (search === undefined) {
                    delete where[Op.or];
                }
                return where;
            })(),
        };
    }
    protected handlePagination() {
        const limit = this.req.query.limit || OFFERS_PER_PAGE;
        const page = this.req.query.page || 1;
        //
        return {
            limit,
            offset: (page - 1) * limit,
        };
    }
    //
    //
    //
    async main(req: GetAllRequest, res: Response) {
        this.req = req;
        const response = await Offer.findAndCountAll({
            ...this.generateWhereClause(),
            attributes: {
                exclude: [...this.excludes.fromOffer, "status"],
            },
            include: [
                {
                    model: User,
                    as: "creator",
                    attributes: {
                        exclude: this.excludes.fromCreator,
                    },
                },
                {
                    model: Follow,
                    as: "follows",
                    attributes: {
                        exclude: this.excludes.fromFollows,
                    },
                },
            ],
            ...this.generateOrderClause(),
            ...this.handlePagination(),
        });
        //
        return res.send(response);
    }
}
export default new GetManyOffersController();
