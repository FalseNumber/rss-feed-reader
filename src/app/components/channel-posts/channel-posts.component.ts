import { Component, OnInit, Input } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { PostContentComponent } from '../post-content/post-content.component';

@Component({
  selector: 'app-channel-posts',
  templateUrl: './channel-posts.component.html',
  styleUrls: ['./channel-posts.component.scss']
})
export class ChannelPostsComponent implements OnInit {

  //channelPostData: ChannelPostData[];
  channelPostTitle: string[] = [];
  activeChannelIdx: number;

  @Input()
  postContentComponent:PostContentComponent;

  constructor(private channelsService: ChannelsService) { }

  ngOnInit() {
    this.fillPostTitleArray(0);
  }

  clearPostTitles() {
    this.channelPostTitle = [];
  }

  renderPostContent(postIdx: number) {
    this.postContentComponent.clearPostData();
    this.postContentComponent.fillPostData(this.activeChannelIdx, postIdx);
  }

  fillPostTitleArray(indx: number) {
    this.activeChannelIdx = indx;

    this.channelsService.getChannelDataById(indx).subscribe(channelData => {
      for (let i = 0; i < channelData["items"].length; i++) {
        this.channelPostTitle.push(channelData["items"][i]["title"]);
      }
    });
  }
}
