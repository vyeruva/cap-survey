import { Component, OnInit } from '@angular/core';
import {SurveyService} from './survey.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  selectedTabIndex = 0;

  public clickedTab(index){
    this.selectedTabIndex = index;
  }

  //-------------------------------------------------------
  // Radar
  public radarChartLabels:string[] = ['Source Control', 'Build', 'Test Management', 'Deployment', 'Release Management', 'Monitoring'];

  public options = {
          scale: {
              ticks:{
                max:5,
                stepSize:1,
                beginAtZero: true
              }
          }
      }

  public radarChartData:any = [
    {data: [4,4,2,3,4,3], label: 'Current Level',fill: false},
    {data: [4,4,4,4,4,3], label: 'Expected Level', fill:false}
  ];
  public radarChartType:string = 'radar';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



  //-------------------------------------------------------

  private questions:any={};
  private types=[];
  public showForm = true;
  constructor(private surveyService:SurveyService) { }

  ngOnInit() {
    this.surveyService.getQuestions().subscribe(
      (response) => {
        this.questions = response;
        this.types = Object.keys(this.questions);
        console.log(this.types);
        console.log(response)
      },
      (error) => console.log(error)
    );
  }

  onSubmit(form:NgForm){

    let answers=[];

    class Answer{
      name:String;
      level:String;
      question:any;
      current: Boolean;
      expected: Boolean;
      comments: String;
    };

    let answer:Answer;

    let name = form.value.name;
    let project = form.value.project;

    for(let typeIndex=0;typeIndex<this.types.length;typeIndex++){
      for(let questionIndex=0;questionIndex<this.questions[this.types[typeIndex]].length;questionIndex++){
        let answer:Answer = new Answer();
        answer.question = this.questions[this.types[typeIndex]][questionIndex];
        answer.level = form.value["groupInput"+this.types[typeIndex]]["level-" + typeIndex + "-" + questionIndex];
        answer.current = form.value["groupInput"+this.types[typeIndex]]["current-" + typeIndex + "-" + questionIndex];
        answer.comments = form.value["groupInput"+this.types[typeIndex]]["comments-" + typeIndex + "-" + questionIndex];
        answers.push(answer);
      }
    }
    this.surveyService.submitAnswers(answers,name, project)
      .subscribe(
        (response: any) => {
          console.log(response);

          let rankingId = response._body;

          this.surveyService.getRanking(rankingId).subscribe(
            (response) => {
              let ranking:any = response[0];
              this.radarChartData = [
                {data: [ranking.sourcecontrolcurrent,ranking.buildcurrent,ranking.tmcurrent,ranking.deploycurrent,ranking.rmcurrent,ranking.moncurrent], label: 'Current Level',fill: false},
                {data: [ranking.sourcecontrolexpected,ranking.buildexpected,ranking.tmexpected,ranking.deployexpected,ranking.rmexpected,ranking.monexpected], label: 'Expected Level', fill:false}
              ];
              this.showForm = false;
              console.log(response);
            },
            (error) => console.log(error)
          );

        }
      );
  }

  next(){
    this.selectedTabIndex++;
  }

  previous(){
    this.selectedTabIndex--;
  }
}
