import { Router, Request, Response } from 'express';
import EventService from '../Actions/EventService';
import UserModel from '../models/user.model';
import UserFactory, { Role } from '../Factory/UserFactory';

const router = Router();

router.post('/create', (req: Request, res: Response) => {
  const { userId, ...eventData } = req.body;
  if (!userId) {
    res.status(400).json({ success: false, error: 'Missing userId' });
    return;
  }
  UserModel.findById(userId)
    .then(userDoc => {
      if (!userDoc) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
      }
      const userFactory = new UserFactory();
      const user = userFactory.fromDocument(userDoc);
      return EventService.createEvent(eventData, user)
        .then(createdEvent => {
          res.status(201).json({ success: true, event: createdEvent });
        })
        .catch((error: any) => {
          res.status(403).json({ success: false, error: error.message });
        });
    })
    .catch((error: any) => {
      res.status(500).json({ success: false, error: error.message });
    });
});

export default router; 