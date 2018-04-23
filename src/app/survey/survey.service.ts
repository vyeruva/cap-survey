import { Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyService {

  private endPointUrl = "https://cox-api-cox-audit.7e14.starter-us-west-2.openshiftapps.com/";
  constructor(private http: Http) { }

  getQuestions(){
    return this.http.get(this.endPointUrl + 'questions')
      .timeout(10000)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }

  submitAnswers(answers,name,project){
    return this.http.put(this.endPointUrl + 'answers/'+name+"/"+project, answers);
  }

  getRanking(id){
    return this.http.get(this.endPointUrl + 'scoreboard/'+id).map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
    )
    .catch(
      (error: Response) => {
        return Observable.throw('Something went wrong');
      }
    );
  }

}
