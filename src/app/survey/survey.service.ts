import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyService {

  constructor(private http: Http) { }

  getQuestions(){
    return this.http.get('http://cox-api-cox-audit.7e14.starter-us-west-2.openshiftapps.com/questions')
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
    debugger;
    return this.http.put('http://cox-api-cox-audit.7e14.starter-us-west-2.openshiftapps.com/answers/'+name+"/"+project, answers);
  }

  getRanking(id){
    debugger;
    return this.http.get('http://cox-api-cox-audit.7e14.starter-us-west-2.openshiftapps.com/scoreboard/'+id).map(
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
