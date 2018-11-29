import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import ContentAnimation from "../animations/animations";
import styles from "./Backdrop.module.css";

const Picture = () => <div className={`${styles.picture}`} />;

class Backdrop extends PureComponent {
  state = { container: null };

  componentDidMount() {
    const container = document.querySelector("main");
    this.setState({ container });
  }

  render() {
    const { container } = this.state;

    return container
      ? ReactDOM.createPortal(
          <ContentAnimation show={this.props.show}>
            <Picture />
          </ContentAnimation>,
          container
        )
      : null;
  }
}

export default Backdrop;
