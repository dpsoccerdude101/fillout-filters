export interface Form {
  name: string;
  id: number;
  formId: string;
}

export interface Question {
  name: string;
  id: string;
  type:
    | 'Address'
    | 'AudioRecording'
    | 'Calcom'
    | 'Calendly'
    | 'Captcha'
    | 'Checkbox'
    | 'Checkboxes'
    | 'ColorPicker'
    | 'CurrencyInput'
    | 'DatePicker'
    | 'DateRange'
    | 'DateTimePicker'
    | 'Dropdown'
    | 'EmailInput'
    | 'FileUpload'
    | 'ImagePicker'
    | 'LocationCoordinates'
    | 'LongAnswer'
    | 'Matrix'
    | 'MultiSelect'
    | 'MultipleChoice'
    | 'NumberInput'
    | 'OpinionScale'
    | 'Password'
    | 'Payment'
    | 'PhoneNumber'
    | 'Ranking'
    | 'RecordPicker'
    | 'ShortAnswer'
    | 'Signature'
    | 'Slider'
    | 'StarRating'
    | 'Switch'
    | 'TimePicker'
    | 'URLInput';
}

export interface FormMetaData {
  name: string;
  id: string;
  questions: Array<Question>;
  calculations: Array<{ id: string; name: string; type: 'number' | 'text' }>;
  urlParameters: Array<{ id: string; name: string }>;
}

export interface FormSubmission {
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  questions: Array<Question & { value: string }>;
  calculations: Array<{
    id: string;
    name: string;
    type: 'number' | 'text';
    value: string;
  }>;
  urlParameters: Array<{ id: string; name: string; value: string }>;
  quiz: Record<string, never> | { score: number; maxScore: number };
}

export type FormSubmissionsParams = {
  filters?: {
    value: string | number;
    id: string;
    condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  }[];
  limit?: number;
  afterDate?: string;
  beforeDate?: string;
  offset?: number;
  status?: 'in_progress' | 'finished';
  includeEditLink?: boolean;
  sort?: 'asc' | 'desc';
};

export interface IFilloutRepo {
  findAllForms: () => Promise<Array<Form>>;
  findOneFormMetaData: (formId: string) => Promise<FormMetaData>;
  findOneFormSubmissions: (
    formId: string,
    params: FormSubmissionsParams,
  ) => Promise<{
    responses: Array<FormSubmission>;
    totalResponses: number;
    pageCount: number;
  }>;
}
