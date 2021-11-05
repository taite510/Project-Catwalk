/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable eol-last */
import React from 'react';
import Question from './Question';

class QandAEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { questions } = this.props;
    let quest;
    if (questions.length === 0) {
      quest = <Question />;
    } else {
      quest = questions.map((question, index) => (<Question question={question} key={index} />));
    }
    return (
      <div>
        {quest}
      </div>
    );
  }
}

export default QandAEntry;