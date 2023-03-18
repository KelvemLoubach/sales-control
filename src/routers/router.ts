import { Router} from "express";
import * as controller from '../controllers/controller';

const router = Router();

router.get('/', controller.home);
router.get('/createNewAccount', controller.createNewAccount);
router.post('/createNewAccount', controller.createNewAccount);

export default router;