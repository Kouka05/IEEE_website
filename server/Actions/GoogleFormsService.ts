// src/services/GoogleFormsService.ts
import { google } from 'googleapis';
import EventModel from '../models/event.model';
 import path from 'path';
interface FormQuestion {
  title: string;
  type: 'text' | 'email' | 'choice' | 'checkbox' | 'dropdown' | 'paragraph';
  required: boolean;
  options?: string[]; // For choice, checkbox, dropdown questions
  helpText?: string;
}

interface FormResponse {
  responseId: string;
  timestamp: string;
  answers: Record<string, any>;
  submitterEmail?: string;
}

interface FormData {
  formId: string;
  formUrl: string;  // public URL
  editUrl: string; // admin URL for editing the form
  title: string;
}

interface EventFormTemplate {
  questions: FormQuestion[];
  settings: {
    collectEmailAddresses: boolean;
    requireSignIn: boolean;
    allowResponseEdits: boolean;
  };
}

class GoogleFormsService {
  private forms: any;
  private auth: any;

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    try {
    
const credentialsPath = path.join(__dirname, '../ieeewebsite-465312-25a039dc9010.json');
const credentials = require(credentialsPath);

      
      this.auth = new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: [
          'https://www.googleapis.com/auth/forms.body',
          'https://www.googleapis.com/auth/forms.responses.readonly',
          'https://www.googleapis.com/auth/drive'
        ]
      });

      this.forms = google.forms({ version: 'v1', auth: this.auth });
    } catch (error) {
      console.error('Error initializing Google Forms auth:', error);
      throw new Error('Failed to initialize Google Forms authentication');
    }
  }

  /**
   * Create a Google Form for an event
   */
 

async createEventForm(event: any, templateType: string = 'default'): Promise<string> {
  try {
    const template = this.getEventFormTemplate(templateType, event);
    const formTitle = `${event.title} - Registration Form`;
    const formDescription = `Registration form for ${event.title}${event.description ? `\n\n${event.description}` : ''}`;

    // Create the form
    const formData = await this.createForm(formTitle);

    // Add questions based on template
    await this.addQuestions(formData.formId, template.questions);

    // Update form settings
    await this.updateFormSettings(formData.formId, template.settings);
    console.log('Saving Google Form to DB:', event._id, formData);

    //  Save form info to event in DB
    await EventModel.findByIdAndUpdate(event._id, {
      $set: {
        googleForm: {
          formId: formData.formId,
          formUrl: formData.formUrl,
          editUrl: formData.editUrl,
          isActive: true,
          syncEnabled: true,
        }
      }
    });

    // Return public URL
    return formData.formUrl;

  } catch (error) {
    console.error('Error creating event form:', error);
    throw new Error('Failed to create event registration form');
  }
}


  /**
   * Get predefined templates for event forms
   */
  public getEventFormTemplate(templateType: string, event: any): EventFormTemplate {
    const baseQuestions: FormQuestion[] = [
      {
        title: 'Full Name',
        type: 'text',
        required: true,
        helpText: 'Enter your full name as it should appear on the registration'
      },
      {
        title: 'Email Address',
        type: 'email',
        required: true,
        helpText: 'We will use this email to send you event updates'
      }
    ];

    const templates: Record<string, EventFormTemplate> = {
      default: {
        questions: [
          ...baseQuestions,
          {
            title: 'Phone Number',
            type: 'text',
            required: false,
            helpText: 'Optional: For urgent event communications'
          }
        ],
        settings: {
          collectEmailAddresses: true,
          requireSignIn: false,
          allowResponseEdits: true
        }
      },
      workshop: {
        questions: [
          ...baseQuestions,
          {
            title: 'Experience Level',
            type: 'choice',
            required: true,
            options: ['Beginner', 'Intermediate', 'Advanced'],
            helpText: 'Select your experience level with the workshop topic'
          },
          {
            title: 'What do you hope to learn?',
            type: 'paragraph',
            required: false,
            helpText: 'Tell us about your learning objectives'
          },
          {
            title: 'Technical Requirements',
            type: 'checkbox',
            required: false,
            options: ['Laptop/Computer', 'Specific Software', 'Hardware Tools'],
            helpText: 'What will you bring to the workshop?'
          }
        ],
        settings: {
          collectEmailAddresses: true,
          requireSignIn: false,
          allowResponseEdits: true
        }
      },
      conference: {
        questions: [
          ...baseQuestions,
          {
            title: 'Organization/Company',
            type: 'text',
            required: false
          },
          {
            title: 'Job Title',
            type: 'text',
            required: false
          },
          {
            title: 'Sessions of Interest',
            type: 'checkbox',
            required: false,
            options: ['Keynote', 'Technical Sessions', 'Panel Discussions', 'Networking'],
            helpText: 'Select all that apply'
          },
          {
            title: 'Dietary Restrictions',
            type: 'paragraph',
            required: false
          }
        ],
        settings: {
          collectEmailAddresses: true,
          requireSignIn: true,
          allowResponseEdits: true
        }
      }
    };

    return templates[templateType] || templates.default;
  }

  /**
   * Create a new Google Form
   */
  async createForm(title: string): Promise<FormData> {
    try {
      const newForm = {
        info: {
          title: title
        }
      };
      
      const response = await this.forms.forms.create({
        requestBody: newForm
      });
      
      return {
        formId: response.data.formId,
        formUrl: response.data.responderUri,
        editUrl: `https://docs.google.com/forms/d/${response.data.formId}/edit`,
        title: title
      };
    } catch (error) {
      console.error('Error creating Google Form:', error);
      throw new Error('Failed to create Google Form');
    }
  }

  /**
   * Get existing form details
   */
  async getForm(formId: string): Promise<any> {
    try {
      const response = await this.forms.forms.get({
        formId: formId
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting form:', error);
      throw new Error('Form not found or access denied');
    }
  }

  /**
   * Add questions to a form
   */
  async addQuestions(formId: string, questions: FormQuestion[]): Promise<void> {
    try {
      const requests = questions.map((question, index) => {
        const questionConfig: any = {
          required: question.required
        };

        // Add question type specific configuration
        switch (question.type) {
          case 'text':
            questionConfig.textQuestion = {
              paragraph: false
            };
            break;
          case 'paragraph':
            questionConfig.textQuestion = {
              paragraph: true
            };
            break;
          case 'email':
            questionConfig.textQuestion = {
              paragraph: false
            };
            break;
          case 'choice':
            questionConfig.choiceQuestion = {
              type: 'RADIO',
              options: question.options?.map(option => ({ value: option })) || []
            };
            break;
          case 'checkbox':
            questionConfig.choiceQuestion = {
              type: 'CHECKBOX',
              options: question.options?.map(option => ({ value: option })) || []
            };
            break;
          case 'dropdown':
            questionConfig.choiceQuestion = {
              type: 'DROP_DOWN',
              options: question.options?.map(option => ({ value: option })) || []
            };
            break;
          default:
            questionConfig.textQuestion = {
              paragraph: false
            };
        }

        return {
          createItem: {
            item: {
              title: question.title,
              description: question.helpText || '',
              questionItem: {
                question: questionConfig
              }
            },
            location: { index }
          }
        };
      });

      await this.forms.forms.batchUpdate({
        formId: formId,
        requestBody: { requests }
      });
    } catch (error) {
      console.error('Error adding questions to form:', error);
      throw new Error('Failed to add questions to form');
    }
  }
  
  /**
   * Get form responses
   */
  async getFormResponses(formUrl: string): Promise<FormResponse[]> {
    try {
      const formId = this.extractFormIdFromUrl(formUrl);
      
      const response = await this.forms.forms.responses.list({
        formId: formId
      });
      
      const responses = response.data.responses || [];
      
      return responses.map((response: any) => ({
        responseId: response.responseId,
        timestamp: response.lastSubmittedTime,
        submitterEmail: response.respondentEmail,
        answers: this.parseAnswers(response.answers || {})
      }));
    } catch (error) {
      console.error('Error fetching form responses:', error);
      throw new Error('Failed to fetch form responses');
    }
  }

  /**
   * Extract form ID from Google Forms URL
   */
  private extractFormIdFromUrl(url: string): string {
    const match = url.match(/\/forms\/d\/([a-zA-Z0-9-_]+)/);
    if (!match) {
      throw new Error('Invalid Google Forms URL');
    }
    return match[1];
  }

  /**
   * Parse form answers into a readable format
   */
  private parseAnswers(answers: Record<string, any>): Record<string, any> {
    const parsedAnswers: Record<string, any> = {};

    for (const [questionId, answer] of Object.entries(answers)) {
      if (answer.textAnswers) {
        parsedAnswers[questionId] = answer.textAnswers.answers[0]?.value || '';
      } else if (answer.choiceAnswers) {
        parsedAnswers[questionId] = answer.choiceAnswers.answers?.map((a: any) => a.value) || [];
      } else if (answer.fileUploadAnswers) {
        parsedAnswers[questionId] = answer.fileUploadAnswers.answers?.map((a: any) => a.fileName) || [];
      }
    }

    return parsedAnswers;
  }

  /**
   * Update form settings
   */
  async updateFormSettings(formId: string, settings: {
    acceptingResponses?: boolean;
    allowResponseEdits?: boolean;
    collectEmailAddresses?: boolean;
    requireSignIn?: boolean;
  }): Promise<void> {
    try {
      const requests = [];

      if (settings.collectEmailAddresses !== undefined) {
        requests.push({
          updateSettings: {
            settings: {
              quizSettings: {
                isQuiz: false
              }
            },
            updateMask: 'quizSettings'
          }
        });
      }

      if (requests.length > 0) {
        await this.forms.forms.batchUpdate({
          formId: formId,
          requestBody: { requests }
        });
      }
    } catch (error) {
      console.error('Error updating form settings:', error);
      throw new Error('Failed to update form settings');
    }
  }

  /**
   * Delete a form (move to trash)
   */
  async deleteForm(formUrl: string): Promise<void> {
    try {
      const formId = this.extractFormIdFromUrl(formUrl);
      const drive = google.drive({ version: 'v3', auth: this.auth });
      
      await drive.files.update({
        fileId: formId,
        requestBody: {
          trashed: true
        }
      });
    } catch (error) {
      console.error('Error deleting form:', error);
      throw new Error('Failed to delete form');
    }
  }

  /**
   * Validate if form ID exists and is accessible
   */
  async validateFormAccess(formId: string): Promise<boolean> {
    try {
      await this.getForm(formId);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get form statistics
   */
  async getFormStats(formUrl: string): Promise<{
    totalResponses: number;
    lastResponseDate?: string;
    formTitle: string;
  }> {
    try {
      const formId = this.extractFormIdFromUrl(formUrl);
      const form = await this.getForm(formId);
      const responses = await this.getFormResponses(formUrl);
      
      return {
        totalResponses: responses.length,
        lastResponseDate: responses.length > 0 ? responses[responses.length - 1].timestamp : undefined,
        formTitle: form.info.title
      };
    } catch (error) {
      console.error('Error getting form stats:', error);
      throw new Error('Failed to get form statistics');
    }
  }

  /**
   * Convert form responses to event participants format
   */
  async convertResponsesToParticipants(formUrl: string): Promise<Array<{
    name: string;
    email: string;
    phone?: string;
    additionalInfo: Record<string, any>;
    submissionDate: string;
    responseId: string;
  }>> {
    try {
      const responses = await this.getFormResponses(formUrl);
      const formId = this.extractFormIdFromUrl(formUrl);
      const form = await this.getForm(formId);
      
      // Map question IDs to question titles for better data mapping
      const questionMap = new Map();
      form.items?.forEach((item: any) => {
        if (item.questionItem) {
          questionMap.set(item.questionItem.question.questionId, item.title);
        }
      });

      return responses.map(response => {
        const participant: any = {
          responseId: response.responseId,
          submissionDate: response.timestamp,
          additionalInfo: {}
        };

        // Map answers to participant fields
        Object.entries(response.answers).forEach(([questionId, answer]) => {
          const questionTitle = questionMap.get(questionId) || questionId;
          const lowerTitle = questionTitle.toLowerCase();

          if (lowerTitle.includes('name')) {
            participant.name = answer;
          } else if (lowerTitle.includes('email')) {
            participant.email = answer;
          } else if (lowerTitle.includes('phone')) {
            participant.phone = answer;
          } else {
            participant.additionalInfo[questionTitle] = answer;
          }
        });

        return participant;
      });
    } catch (error) {
      console.error('Error converting responses to participants:', error);
      throw new Error('Failed to convert form responses to participants');
    }
  }
}

export default GoogleFormsService;