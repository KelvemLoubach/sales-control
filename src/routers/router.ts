import { Router, Request, Response} from "express";
import * as controller from '../controllers/controller';
import { checkAccess } from "../middlewares/middleware";

const router = Router();

router.get('/', controller.home);
router.get('/products', checkAccess, controller.products);
router.get('/productSold', checkAccess, controller.soldProduct);
router.get('/logout', controller.logout)

router.post('/signup', controller.signupPost);
router.post('/login', controller.loginPost);
router.post('/products',controller.productsPost);
router.delete('/delete-product/:id',checkAccess, controller.deleteProducts);
router.put('/mark-product-sold/:id',checkAccess, controller.productSold);


export default router;