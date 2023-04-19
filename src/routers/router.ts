import { Router } from "express";
import * as user from '../controllers/controller';
import * as products from '../controllers/controllerProducts';
import { checkAccess } from "../middlewares/middleware";

const router = Router();

router.get('/', user.home);
router.get('/products', checkAccess, products.products);
router.get('/productSold', checkAccess, products.soldProduct);
router.get('/logout', user.logout)

router.post('/signup', user.signupPost);
router.post('/login', user.loginPost);
router.post('/products',products.productsPost);
router.delete('/delete-product/:id',checkAccess, products.deleteProducts);
router.put('/mark-product-sold/:id',checkAccess, products.productSold);


export default router;