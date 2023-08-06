import Highcharts from 'highcharts';
import { Channel, Message } from '../../interfaces';

export const EngagementHelper = {
  engagementMessageOverTimeChartOptions: (
    messageCountList: Message[],
    channels: Channel[]
  ) => {
    const channelMessagesByDate = new Map();
    messageCountList.forEach((message: Message) => {
      if (
        channels.some((channel: Channel) => channel.id === message.channelId)
      ) {
        const date = new Date(message.timeBucket).toISOString().split('T')[0];
        const channelId = message.channelId;
        const count = parseInt(message.count, 10);
        if (!channelMessagesByDate.has(channelId)) {
          channelMessagesByDate.set(channelId, new Map());
        }
        const channelDateMap = channelMessagesByDate.get(channelId);
        channelDateMap.set(date, (channelDateMap.get(date) || 0) + count);
      }
    });

    const channelsWithMessages = channels.filter(
      (channel) =>
        channelMessagesByDate.has(channel.id) &&
        channelMessagesByDate.get(channel.id).size > 1
    );

    const options = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Engagement Messages Over Time',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
      yAxis: {
        title: {
          text: 'Message Count',
        },
      },
      tooltip: {
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          return `<b>${this.series.name}</b><br/>Date: ${Highcharts.dateFormat(
            '%Y-%m-%d',
            Number(this.x)
          )}<br/>Messages: ${Number(this.y)}`;
        },
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },
      series: [],
    };

    channelsWithMessages.forEach((channel) => {
      const data = Array.from(
        channelMessagesByDate.get(channel.id),
        ([date, count]) => [new Date(date).getTime(), count]
      );
      const serie = { name: channel.name, data } as unknown as never;
      options.series.push(serie);
    });

    return options;
  },
};
