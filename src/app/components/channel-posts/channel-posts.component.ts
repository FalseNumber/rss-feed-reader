import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-channel-posts',
  templateUrl: './channel-posts.component.html',
  styleUrls: ['./channel-posts.component.scss']
})
export class ChannelPostsComponent implements OnInit {

  //channelPostData: ChannelPostData[];
  channelPostTitle: string[] = [];

  @ViewChild('post') private postElement: ElementRef;

  constructor(private channelsService: ChannelsService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.fillPostTitleArray(5);
    
    // this.channelPostTitle.pop();
    // this.channelPostTitle.pop();
    //this.clearPostTitleArray();
    //add channelPostData[]
  }

  clearPostTitles() {
    //console.log('does');
    //let elements = this.document.getElementbyClassName('channel-post');
    //console.log(elements);
    //element.style.display = element.style.display === 'none' ? 'block' : 'none';
    //this.postElement.nativeElement.remove();
    this.channelPostTitle = [];
  }

  fillPostTitleArray(indx: number) {
    //channelsInfoArr = [];
    //this.getAllChannelData();
    // let allChannelData = this.channelsService.getAllChannelData();
    // console.log(allChannelData[2]['length']);
    
      this.channelsService.getChannelDataById(indx).subscribe(channelData => {
        //console.log(channelData['Posts'][0]['title']);
        for (let i = 0; i < channelData["items"].length; i++) {
          this.channelPostTitle.push(channelData["items"][i]["title"]);
        }
        //this.channelPostTitle.push(channelData["items"][0]["title"]);
        
        //this.arr.push(response);
        //console.log(channelsInfoArr);
        //return response;
      });
  }
}
