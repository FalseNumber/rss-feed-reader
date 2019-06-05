import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { ChannelPostsComponent } from '../channel-posts/channel-posts.component';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channelTitles: string[] = [];
  prevIdx: number;

  @Input()
  channelPostsComponent:ChannelPostsComponent;

  constructor(private channelsService: ChannelsService,
    private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.fillChannelTitlesArray();
  }

  showPostList(i: number) {
    if (i !== this.prevIdx) {
      if (!this.channelPostsComponent.panelState) {
        this.channelPostsComponent.panelToggle();
      }

      this.renderPostListData(i);
      this.prevIdx = i;
    } else {
      this.channelPostsComponent.panelToggle();
    }
  }

  renderPostListData(i: number) {
    this.channelPostsComponent.clearPostTitles();
    this.channelPostsComponent.fillPostTitleArray(i);
    this.renderStatisticsData(i);
  }

  renderStatisticsData(channelIdx: number) {
    this.statisticsService.setChannelIndex(channelIdx);
  }

  fillChannelTitlesArray() {
    for (let i = 0; i < this.channelsService.channelList.length; i++) {
      this.channelsService.getChannelDataById(i).subscribe(channelData => {
        this.channelTitles[i] = channelData.feed.title;
       });
    }
  }
}
