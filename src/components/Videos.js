import React, {Component} from 'react';
import YoutubeEmbed from './YoutubeEmbed';

export class Videos extends Component {
    render(){
            return(<div>
              <YoutubeEmbed embedId="jJddYjx_Bq0"/>
              <YoutubeEmbed embedId="cTf1vRTVMbQ"/>
            </div> )
    }
}
