import { Component } from '@angular/core';

/**
 * Generated class for the ProgressClockComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-clock',
  templateUrl: 'progress-clock.html'
})
export class ProgressClockComponent {

  MS_IN_AN_HOUR = (1000*60*60);
  MS_IN_A_DAY = (1000*60*60) * 24;

  progressMinute : number;
  progressHour : number;
  progressDay : number;
  progressMonth : number;
  progressYear : number;

  tickInterval: number;


  constructor() {
    
    this.progressMinute = 0.0;
    this.progressHour = 0.0;
    this.progressDay = 0.0;
    this.progressMonth = 0.0;
    this.progressYear = 0.0;

  }

  ngOnInit() {
    this.tickInterval = setInterval(() => {
      this.tick(); 
    }, 1000.0 / 12.0);
  }

  ngOnDestroy() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
    }
  }

  tick() {
    this.updateClock();
  }

  padNumber( n: number ){
    if( ("" + n).length < 2) return "0" + n;
    return n;
  }
  
  /* updateTime( now: Date ){
    let clock = document.getElementById( "div-time" );
    let display =
      this.padNumber(now.getHours()) + ":" +
      this.padNumber( now.getMinutes()) + ":" +
      this.padNumber(now.getSeconds());
    clock.innerHTML = display;
  } */
  
  getDaysInCurrentMonth(){
    // cribbed from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
    let d = new Date();
    d = new Date( d.getFullYear(), d.getMonth()+1, 0);
    return d.getDate();
  }
  
  updateMinute( now: Date ){
    let minuteProgress = now.getSeconds() / 60.0;
    return minuteProgress;
  }
  
  updateHour( now: Date, dtDayStart: Date ){
    // use ms in an hour to calculate percentage through current hour
    let tsHourStart = dtDayStart.getTime() + (now.getHours() * this.MS_IN_AN_HOUR);
    let hourProgress = (now.getTime() - tsHourStart) / this.MS_IN_AN_HOUR;
    // debugger;
    return hourProgress;
  }
  
  updateDay( now: Date, dtDayStart: Date ){
    // use ms in an day to calculate percentage through current day
    let dayProgress = (now.getTime() - dtDayStart.getTime()) / this.MS_IN_A_DAY;
    return dayProgress;
  }
  
  updateClock(){
    
    let now = new Date();
    let dtDayStart = new Date( now.getFullYear(), now.getMonth(), now.getDate() );
    let daysInCurrentMonth = this.getDaysInCurrentMonth();
    
    //let msThisMonth = daysInCurrentMonth * MS_IN_A_DAY;
    
    let minuteProgress = this.updateMinute( now );
    let hourProgress = this.updateHour( now, dtDayStart );
    
    this.progressMinute = minuteProgress * 100.0;
    this.progressHour = hourProgress * 100.0;

    let dayProgress = this.updateDay( now, dtDayStart );
    let monthProgress = (now.getDate()+dayProgress) / daysInCurrentMonth;
    let yearProgress = (now.getMonth()+monthProgress) / 12.0;
    
    this.progressDay = dayProgress * 100.0;
    this.progressMonth = monthProgress * 100.0;
    this.progressYear = yearProgress * 100.0;
    
   // this.updateTime( now );
 }

}
