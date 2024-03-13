import { Injectable } from '@nestjs/common';
import {
  Form,
  FormMetaData,
  FormSubmission,
  FormSubmissionsParams,
  IFilloutRepo,
} from './types';
import configuration from 'src/common/configuration';
import { serviceBase } from 'src/common/serviceBase';

@Injectable()
export class FilloutService implements IFilloutRepo {
  private api: ReturnType<typeof serviceBase>;

  constructor() {
    const { apiKey, apiUrl } = configuration();
    const headers = { Authorization: `Bearer ${apiKey}` };
    this.api = serviceBase(apiUrl, headers);
  }

  async findAllForms() {
    const { data } = await this.api.get<Array<Form>>('/forms');
    return data;
  }

  async findOneFormMetaData(formId: string) {
    const { data } = await this.api.get<FormMetaData>(`/forms/${formId}`);
    return data;
  }

  async findOneFormSubmissions(formId: string, params: FormSubmissionsParams) {
    const searchParams = new URLSearchParams({
      ...(params.afterDate && { afterDate: params.afterDate }),
      ...(params.beforeDate && { beforeDate: params.beforeDate }),
      ...(params.includeEditLink && { includeEditLink: 'true' }),
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.offset && { offset: params.offset.toString() }),
      ...(params.sort && { sort: params.sort }),
      ...(params.status && { status: params.status }),
    });

    const { data } = await this.api.get<{
      responses: Array<FormSubmission>;
      totalResponses: number;
      pageCount: number;
    }>(`/forms/${formId}/submissions?${searchParams.toString()}`);
    return data;
  }
}
