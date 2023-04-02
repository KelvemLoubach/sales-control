import { Router, Request, Response} from "express";
import * as controller from '../controllers/controller';
import { checkAccess } from "../middleware";

const router = Router();

router.get('/', controller.home);
router.get('/signup', controller.signup);
router.get('/products', checkAccess, controller.products);
router.get('/login', controller.login);
router.get('/productSold', checkAccess, controller.soldProduct)

router.post('/signup', controller.signupPost);
router.post('/login', controller.loginPost);
router.post('/products',controller.productsPost);
router.post('/delete-product', controller.deleteProducts);
router.post('/mark-product-sold/:id', controller.productSold);


export default router;