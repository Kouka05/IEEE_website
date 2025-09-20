import { Router, Request, Response, RequestHandler } from 'express';
import TrainingModel from '../models/training.model';
import TrainingService from '../Actions/TrainingService';

const router = Router();

// Create training
const createTrainingHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const training = await TrainingService.createTraining(req.body);
    res.status(201).json({ success: true, training });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
router.post('/', createTrainingHandler);
// Get training by id
const getTrainingByIdHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const training = await TrainingService.getTrainingById(id);
    res.json({ success: true, training });
  } catch (err: any) {
    res.status(404).json({ success: false, error: err.message });
  }
};
router.get('/:id', getTrainingByIdHandler);


// List trainings (optionally upcoming only)
const listTrainingsHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { upcoming } = req.query as { upcoming?: string };
    const trainings = await TrainingService.listTrainings(upcoming === 'true');
    res.json({ success: true, trainings });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
router.get('/', listTrainingsHandler);

// Update training
const updateTrainingHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const updated = await TrainingService.updateTraining(id, req.body);
    res.json({ success: true, training: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
router.put('/:id', updateTrainingHandler);

// Delete training
const deleteTrainingHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const deleted = await TrainingService.deleteTraining(id);
    res.json({ success: true, training: deleted });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
router.delete('/:id', deleteTrainingHandler);

export default router;


