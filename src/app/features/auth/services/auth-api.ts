import { Injectable } from '@angular/core';
import { RegisterReqModel, RegisterResModel } from '@auth/models';
import { HttpService } from '@core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApi extends HttpService {
  register(data: RegisterReqModel) {
    return this.postP<RegisterResModel, RegisterReqModel>('/auth/register', data);
  }
}
