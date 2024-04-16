import { Router } from "express";
import { donateBlood, getAllUsers, login, recieveBlood, signUp } from "../controllers/user.controller.js";
import { addHospital, getAllHospitals } from "../controllers/hospital.controller.js";

const router=Router();

router.get('/allUsers',getAllUsers);
router.post('/signin',signUp);
router.post('/login',login);


router.post('/addhospital',addHospital);
router.get('/allhospitals',getAllHospitals);
router.post('/donate',donateBlood);
router.post('/recieve',recieveBlood);

export default router;