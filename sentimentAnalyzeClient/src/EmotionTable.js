import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
        entries: [
            { emotion: 'sadness', value: '0.250524' },
            { emotion: 'joy', value: '0.722962' },
            { emotion: 'fear', value: '0.0099157' },
            { emotion: 'disgust', value: '0.003132' },
            { emotion: 'anger', value: '0.016098' }
            ]
        }
    }

    renderTableData() {
        return this.state.emotions.map(sentiment, index) {
            const { emotion, value } = sentiment
            return (
                <tr key={emotion}>
                <td>{value}</td>
                </tr>
            );
        }
    }

    render() {
      return (
         <div>
            <table className="table-bordered">
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }

}

export default EmotionTable;
