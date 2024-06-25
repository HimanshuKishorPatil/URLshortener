import { Component, OnDestroy } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnDestroy {

dhtData:any;
subscription:Subscription;
constructor(private mqttService:MqttService){
  this.subscription=this.mqttService.observe("Tempdata").subscribe((message:IMqttMessage)=>{
    this.dhtData=JSON.parse(message.payload.toString());
  })
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
