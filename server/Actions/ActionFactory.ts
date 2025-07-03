import Event from './Event';
// import Call from './Call';
// import Election from './Election';
// import Training from './Training';
import User from '../Factory/User';

type ActionType = 'Event' | 'Call' | 'Election' | 'Training';

interface EventParams {
    title: string;
    description: string;
    createdBy: User;
    date: Date;
    location: string;
    speakers: Map<string, string>;
    sponsors: Array<string>;
    timeline: Map<string, string>;
    participants: Array<User>;
    eventForm: string;
    registrationDeadline: Date;
    maxParticipants: number;
}

// Define interfaces for CallParams, ElectionParams, TrainingParams as needed

class ActionFactory {
    public async createAction(
        type: ActionType,
        params: any // Use specific types for each action for better safety
    ): Promise<any> {
        let action: any;

        switch (type) {
            case 'Event':
                action = new Event(
                    params.title,
                    params.description,
                    params.createdBy,
                    params.date,
                    params.location,
                    params.speakers,
                    params.sponsors,
                    params.timeline,
                    params.participants,
                    params.eventForm,
                    params.registrationDeadline,
                    params.maxParticipants

                    
                );
                // Optionally: Save to DB if you have an EventModel
                // const newEvent = new EventModel({...});
                // await newEvent.save();
                break;
            // case 'Call':
            //     action = new Call(...);
            //     break;
            // case 'Election':
            //     action = new Election(...);
            //     break;
            // case 'Training':
            //     action = new Training(...);
            //     break;
            default:
                throw new Error('Invalid action type');
        }

        return action;
    }
}

export default ActionFactory;