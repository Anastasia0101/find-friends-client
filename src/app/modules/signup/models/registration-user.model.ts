import {RegistrationProgress} from "../../shared/models";

export class RegistrationUserModel {
  public progress: RegistrationProgress = RegistrationProgress.START;

  public id = '';
  public email = '';
  public password = '';
  public name = '';
  public nickname = '';
  public dateOfBirth: Date = new Date();
  public country = '';
  public sentenceAboutUser = '';
  public avatarUrl = '';
  public interests: string[] = [];
}
