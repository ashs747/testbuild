import React from 'react';
import Markdown from 'react-remarkable';

class ToolkitPageView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    //action to get toolkit content
  }

  render() {
    var mainContent = `Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus.

##### Sub Heading
Nullam quis risus eget urna mollis ornare vel eu leo. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.

![Graph](/assets/img/toolkit-graph.jpg)

Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur.`;
    var hints = `+ Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
+ Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
+ Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
+ Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`;
    return (
      <div className="toolkit-page">
        <div className="header">
          <div className="row">
            <div className="col-md-1 col-sm-2">
              <div className="header-icon"><i className={`fa fa-wrench`}></i></div>
            </div>
            <div className="col-md-8 col-sm-10">
              <h1>Linking actions to purpose and outcomes using SMART</h1>
            </div>
            <div className="col-md-3 visible-lg visible-md">
              <div className="pdf">
                <a>Download PDF</a>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="row">
            <div className="col-md-9 left-bar">
              <h4>Toolkit Content</h4>
              <div className="content">
                <Markdown source={mainContent} />
              </div>
            </div>
            <div className="col-md-12 hidden-lg hidden-md second-pdf">
              <a>Download as PDF <i className="fa fa-chevron-right"></i></a>
            </div>
            <div className="col-md-3 right-bar">
              <div className="hints-and-tips">
                <h3>Hints and Tips</h3>
                <div className="list">
                  <Markdown source={hints} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToolkitPageView;
