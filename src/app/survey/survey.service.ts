import { Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyService {

  private endPointUrl = "https://murmuring-shelf-42077.herokuapp.com/";
  constructor(private http: Http) { }

  getQuestions(){
    return this.http.get(this.endPointUrl + 'questions')
      .timeout(70000)
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
    return this.http.put(this.endPointUrl + 'answers/'+name+"/"+project, answers).timeout(70000);
  }

  getRanking(id){
    return this.http.get(this.endPointUrl + 'scoreboard/'+id)
    .timeout(70000)
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

}
