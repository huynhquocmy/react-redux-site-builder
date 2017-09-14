import React from 'react';
import PropTypes from 'prop-types';

class Section extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.section.content}
            </div>
        );
    }
}

Section.propTypes = {
    section: PropTypes.object
};

export default Section;
