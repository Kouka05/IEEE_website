import TrainingModel from '../models/training.model';
import GoogleFormsService from './GoogleFormsService';

class TrainingService {
  static async createTraining(data: any) {
    const {
      title,
      department,
      level,
      hours,
      nextStart,
      summary,
      outcomes,
      maxParticipants,
      prerequisites,
      instructor,
      location,
      materials,
      createdBy,
    } = data;

    // Basic validation
    if (!title) throw new Error('Title is required');
    if (!department) throw new Error('Department is required');
    if (!level) throw new Error('Level is required');

    const doc = await TrainingModel.create({
      title,
      department,
      level,
      hours,
      nextStart,
      summary,
      outcomes: Array.isArray(outcomes) ? outcomes : [],
      maxParticipants,
      prerequisites,
      instructor,
      location,
      materials,
      createdBy,
    });
    try {
      const gfs = new GoogleFormsService();
      await gfs.createTrainingForm(doc);
    } catch (e) {
      // Keep creation successful even if form fails; log error
      console.error('Training form creation failed:', e);
    }
    return doc;
  }

  static async getTrainingById(id: string) {
    if (!id) throw new Error('Training id is required');
    const training = await TrainingModel.findById(id);
    if (!training) throw new Error('Training not found');
    return training;
  }

  static async listTrainings(upcomingOnly: boolean = false) {
    const query: any = {};
    if (upcomingOnly) {
      const now = new Date();
      query.nextStart = { $gte: now };
    }
    const list = await TrainingModel.find(query).sort({ nextStart: 1, createdAt: -1 });
    return list;
  }

  static async updateTraining(id: string, updates: any) {
    if (!id) throw new Error('Training id is required');
    // Sanitize outcomes
    if (updates && updates.outcomes && !Array.isArray(updates.outcomes)) {
      updates.outcomes = [];
    }
    const updated = await TrainingModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) throw new Error('Training not found');
    return updated;
  }

  static async deleteTraining(id: string) {
    if (!id) throw new Error('Training id is required');
    const deleted = await TrainingModel.findByIdAndDelete(id);
    if (!deleted) throw new Error('Training not found');
    return deleted;
  }
}

export default TrainingService;


