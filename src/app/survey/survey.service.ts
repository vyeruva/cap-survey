import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyService {

  constructor(private http: Http) { }

  getQuestions(){
    return this.http.get('http://localhost:8090/questions')
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
    return this.http.put('http://localhost:8090/answers/'+name+"/"+project, answers);
  }

  getRanking(id){
    debugger;
    return this.http.get('http://localhost:8090/scoreboard/'+id).map(
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
