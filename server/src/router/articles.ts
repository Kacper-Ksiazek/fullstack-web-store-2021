// controllers
import CreateArticleController from "../controllers/articles/CreateArticleController";
import DeleteArticleController from "../controllers/articles/DeleteArticleController";
import HighlightArticleController from "../controllers/articles/HighlightArticleController";
import GetSingleArticleController from "../controllers/articles/GetSingleArticleController";
import GetManyArticlesController from "../controllers/articles/GetManyArticlesController";
import GetHighlightedArticlesController from "../controllers/articles/GetHighlightedArticlesController";
// tools
import { Response, Router } from "express";
import authorization from "../middlewares/authenticate";
import { CreateNewArticleValidator, HighlightArticleValidator } from "../middlewares/ArticlesValidators";
//
const router = Router();
//
router.get("/single/:slug", (req: any, res: any) => GetSingleArticleController.main(req, res));
router.get("/", (req: any, res: any) => GetManyArticlesController.main(req, res));
router.get("/highlighted", (req: any, res: any) => GetHighlightedArticlesController.main(req, res));
router.post("/", [authorization, CreateNewArticleValidator], (req: any, res: Response) => CreateArticleController.main(req, res));
router.post("/:id/highlight", [authorization, HighlightArticleValidator], (req: any, res: Response) => HighlightArticleController.main(req, res));
router.delete("/:id", [authorization], (req: any, res: Response) => DeleteArticleController.main(req, res));
//
export default router;
