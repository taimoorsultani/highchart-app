import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { EngagementHelper } from '../../utils/helpers';
import { messageCountList, channels } from '../../utils';

const EngagementMessagesOverTime: React.FC = () => {
  const options = EngagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />;
    </div>
  );
};

export default EngagementMessagesOverTime;
