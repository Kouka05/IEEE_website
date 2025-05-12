import { Router } from 'express';
import UserSignupService from '../Factory/UserSignupService';
import UserLoginService from '../Factory/UserLoginService';

const router = Router();

router.post('/signup', async (req, res) => {
  console.log('Received signup request:', req.body.email);
  const signupService = new UserSignupService();
  const result = await signupService.createUser(req.body);
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

router.post('/login', async (req, res) => {
  console.log('Received login request:', req.body.email);
  const loginService = new UserLoginService();
  const { email, password } = req.body;
  const result = await loginService.login(email, password);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
});

export default router;