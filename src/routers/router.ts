import { Router} from "express";
import * as controller from '../controllers/controller';

const router = Router();

router.get('/', controller.home);
router.get('/userCreateAccount', controller.userCreateAccount);
router.get('/userCreate', controller.userCreate);
router.get('/existingUser', controller.existingUser);


router.post('/createNewAccount', controller.createNewAccount);
router.post('/loginValidation', controller.loginValidation);

export default router;