import React, { useState } from 'react';
import Lightbox from 'react-awesome-lightbox';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spans: 0,
      openLightBox: false,
    };

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans); // setSpans is fired after image is loaded
  }

  setSpans = () => {
    if (this.imageRef.current) {
      // > Get image height
      const height = this.imageRef.current.clientHeight;
      // > Find number of rows needed for image
      const spans = Math.ceil(height / 10);
      // > Set span as image state
      this.setState({ spans: spans });
    }
  };

  render() {
    return (
      <div
        className='image-card'
        style={{ gridRowEnd: `span ${this.state.spans}` }}
      >
        {/* <img ref={this.imageRef} src={this.props.image} alt={this.props.name} /> */}
        <img
          ref={this.imageRef}
          src={this.props.image}
          alt='facility'
          onClick={() => this.setState({ openLightBox: true })}
        />
        {this.state.openLightBox && (
          <Lightbox
            image={this.props.image}
            showTitle='false'
            onClose={() => this.setState({ openLightBox: false })}
          ></Lightbox>
        )}
      </div>
    );
  }
}

export default ImageCard;
